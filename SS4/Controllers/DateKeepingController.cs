using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Data.SqlClient;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class DateKeepingController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "DateKeeping", "index"))
                return View();
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }
        public ActionResult Report()
        {
            if (clsShared.checkPermission("xem", "DateKeeping", "index"))
                return View();
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }

        [HttpPost]
        public ActionResult getDateKeeping()
        {
            string MY = this.Request.Params["MY"] ?? DateTime.Now.ToString("MM/yyyy");
            MY = "01/" + MY;
            DateTime dt = DateTime.ParseExact(MY, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            return Content(JsonConvert.SerializeObject(clsDateKeeping.getDateKeepingByMY(dt), Formatting.Indented), "application/json");
        }

        [HttpPost]
        public ActionResult getDateKeepingReport()
        {
            string MY = this.Request.Params["MY"] ?? DateTime.Now.ToString("MM/yyyy");
            MY = "01/" + MY;
            DateTime dt = DateTime.ParseExact(MY, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            return Content(JsonConvert.SerializeObject(clsDateKeeping.getDateKeepingByMYReport(dt), Formatting.Indented), "application/json");
        }

        [HttpPost]
        public ActionResult SaveTimeKeeping()
        {
            bool bErr = false;
            string message = "";

            DataTable dt = new DataTable("ChamcongType");
            dt.Columns.Add("employeeid", typeof(int));
            dt.Columns.Add("sdatekeeping", typeof(string));
            dt.Columns.Add("timekeeping", typeof(decimal));
            dt.Columns.Add("othervalue", typeof(string));

            string strjson = this.Request.Params["result"] ?? "{}";
            var parseObject = JsonConvert.DeserializeObject<JObject>(strjson);
            if (parseObject["thang"] != null && parseObject["nam"] != null)
            {
                #region processDataRaw
                string sThang = parseObject["thang"].ToString();
                string sNam = parseObject["nam"].ToString();
                JArray records = (JArray)parseObject["records"];
                foreach (var item in records.Children())
                {
                    DataRow rowKeeping = dt.NewRow();
                    decimal ValTime = 0;
                    var itemProperties = item.Children<JProperty>();
                    int employeeid = int.Parse(itemProperties.FirstOrDefault(x => x.Name == "employeeid").Value.ToString());
                    foreach (var detail in itemProperties)
                    {
                        if (detail.Name != "group" && detail.Name != "line" && detail.Name != "fullname" && detail.Name != "employeeid" && detail.Value.ToString() != "")
                        {
                            ValTime = 0;
                            rowKeeping = dt.NewRow();
                            rowKeeping["sdatekeeping"] = string.Format("{0}/{1}/{2}", detail.Name.Substring(1), sThang, sNam);
                            rowKeeping["employeeid"] = employeeid;
                            if (!decimal.TryParse(detail.Value.ToString(), out ValTime))
                            {
                                rowKeeping["timekeeping"] = 0;
                                rowKeeping["othervalue"] = detail.Value.ToString();
                            }
                            else
                            {
                                rowKeeping["timekeeping"] = ValTime <= 2 ? 0 : ValTime;
                                rowKeeping["othervalue"] = detail.Value.ToString();//ValTime <= 2 ? ValTime.ToString() : "";
                            }
                            dt.Rows.Add(rowKeeping);
                        }
                    }
                }
                #endregion
                #region processDataDB
                try
                {
                    SqlParameter[] arrPara = new SqlParameter[2];
                    (arrPara[0] = new SqlParameter("@nhanvienid", SqlDbType.BigInt)).Value = 1;
                    (arrPara[1] = new SqlParameter("@detail", System.Data.SqlDbType.Structured)).TypeName = "dbo.ChamcongType";
                    arrPara[1].Value = dt;
                    SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_chamcong_createorupdate", arrPara);
                }
                catch(Exception ex) { bErr = true; message = ex.Message; }
                #endregion

            }

            return Json(new {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
