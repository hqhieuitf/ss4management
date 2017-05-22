using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class ReportController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RPT_CheckProduct() {
            if (clsShared.checkPermission("xem", "Report", "RPT_CheckProduct"))
            {
                ViewData["tblProduct"] = (new clsProduct()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name + " - " + item.p1
                }).ToList();
                ViewData["tblCont"] = (new clsCont()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = string.Format("{0}", item.name)
                }).ToList();
                ViewData["tblLine"] = (new clsLine()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name
                }).ToList();
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");            
        }
        public ActionResult RPT_CheckProduct_Data() {
            string sTuNgay = Request.Params["tungay"];
            string sDenNgay = Request.Params["denngay"];
            int productid = int.Parse(Request.Params["productid"] ?? "-1");
            int contid = int.Parse(Request.Params["contid"] ?? "-1");

            SqlParameter[] arr = new SqlParameter[4];
            (arr[0] = new SqlParameter("@stungay", System.Data.SqlDbType.VarChar, 10)).Value = sTuNgay;
            (arr[1] = new SqlParameter("@sdenngay", System.Data.SqlDbType.VarChar, 10)).Value = sTuNgay;
            (arr[2] = new SqlParameter("@productid", System.Data.SqlDbType.Int)).Value = productid;
            (arr[3] = new SqlParameter("@contid", System.Data.SqlDbType.Int)).Value = contid;
            DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "rpt_kiemtrachatluong", arr).Tables[0];
            string sSQL = "";
            foreach (DataRow row in dt.Rows)
            {
                sSQL += row["s"].ToString();
            }
            dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.Text, sSQL).Tables[0];

            return Content(JsonConvert.SerializeObject(dt, Formatting.Indented), "application/json");
        }

        public ActionResult RPT_CheckProductById()
        {
            if (clsShared.checkPermission("xem", "Report", "RPT_CheckProduct"))
            {
                ViewData["tblProduct"] = (new clsProduct()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name + " - " + item.p1
                }).ToList();                
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }
        public ActionResult RPT_CheckProductById_Data()
        {
            string sTuNgay = Request.Params["tungay"];
            string sDenNgay = Request.Params["denngay"];
            int productid = int.Parse(Request.Params["productid"] ?? "-1");

            SqlParameter[] arr = new SqlParameter[3];
            (arr[0] = new SqlParameter("@stungay", System.Data.SqlDbType.VarChar, 10)).Value = sTuNgay;
            (arr[1] = new SqlParameter("@sdenngay", System.Data.SqlDbType.VarChar, 10)).Value = sDenNgay;
            (arr[2] = new SqlParameter("@productid", System.Data.SqlDbType.Int)).Value = productid;
            DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "rpt_kiemtrachatluong_byproductid", arr).Tables[0];
            string sSQL = "";
            foreach (DataRow row in dt.Rows)
            {
                sSQL += row["s"].ToString();
            }
            dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.Text, sSQL).Tables[0];

            return Content(JsonConvert.SerializeObject(dt, Formatting.Indented), "application/json");
        }

        public ActionResult RPT_CheckProductEPE()
        {
            if (clsShared.checkPermission("xem", "Report", "RPT_CheckProduct"))
            {
                ViewData["tblProduct"] = (new clsProduct()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name + " - " + item.p1
                }).ToList();
                ViewData["tblCont"] = (new clsCont()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = string.Format("{0}", item.name)
                }).ToList();
                ViewData["tblLine"] = (new clsLine()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name
                }).ToList();
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }
        public ActionResult RPT_CheckProductEPE_Data()
        {
            string sTuNgay = Request.Params["tungay"];
            string sDenNgay = Request.Params["denngay"];
            int productid = int.Parse(Request.Params["productid"] ?? "-1");
            int contid = int.Parse(Request.Params["contid"] ?? "-1");

            SqlParameter[] arr = new SqlParameter[4];
            (arr[0] = new SqlParameter("@stungay", System.Data.SqlDbType.VarChar, 10)).Value = sTuNgay;
            (arr[1] = new SqlParameter("@sdenngay", System.Data.SqlDbType.VarChar, 10)).Value = sTuNgay;
            (arr[2] = new SqlParameter("@productid", System.Data.SqlDbType.Int)).Value = productid;
            (arr[3] = new SqlParameter("@contid", System.Data.SqlDbType.Int)).Value = contid;
            DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "rpt_kiemtrachatluong_loimay", arr).Tables[0];
            string sSQL = "";
            foreach (DataRow row in dt.Rows)
            {
                sSQL += row["s"].ToString();
            }
            dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.Text, sSQL).Tables[0];

            return Content(JsonConvert.SerializeObject(dt, Formatting.Indented), "application/json");
        }


        public ActionResult RPT_DialyInspection() {
            if (clsShared.checkPermission("xem", "Report", "RPT_DialyInspection"))
            {
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }
        public ActionResult RPT_DialyInspection_Data() {
            string thang = Request.Params["thang"] ?? "01";
            string nam = Request.Params["nam"] ?? "2015";
            int days = DateTime.DaysInMonth(int.Parse(nam), int.Parse(thang));
            DateTime FirstDate = new DateTime(int.Parse(nam), int.Parse(thang), 1);
            DateTime firstOfNextMonth = FirstDate.AddMonths(1);
            DateTime lastOfThisMonth = firstOfNextMonth.AddDays(-1);
            string sPara = "";
            for (int i = 1; i <= days; i++) {
                if (string.IsNullOrEmpty(sPara)) sPara = string.Format("[{0}]", i < 10 ? "0" + i.ToString() : i.ToString());
                else sPara += string.Format(",[{0}]", i < 10 ? "0" + i.ToString() : i.ToString());
            }
            SqlParameter[] arr = new SqlParameter[3];
            (arr[0] = new SqlParameter("@stungay", System.Data.SqlDbType.VarChar, 10)).Value = FirstDate.ToString("dd/MM/yyyy");
            (arr[1] = new SqlParameter("@sdenngay", System.Data.SqlDbType.VarChar, 10)).Value = lastOfThisMonth.ToString("dd/MM/yyyy");
            (arr[2] = new SqlParameter("@sPara", System.Data.SqlDbType.VarChar)).Value = sPara;
            DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "rpt_DialyInspection", arr).Tables[0];
            string sSQL = "";
            foreach (DataRow row in dt.Rows) {
                sSQL += row["s"].ToString();
            }
            dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.Text, sSQL).Tables[0];
            return Content(JsonConvert.SerializeObject(dt, Formatting.Indented), "application/json");
        }

        public ActionResult RPT_CheckQuality() {
            if (clsShared.checkPermission("xem", "Report", "RPT_CheckQuality"))
            {
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }
        public ActionResult RPT_CheckQuality_Data()
        {
            string thang = Request.Params["thang"] ?? "01";
            string nam = Request.Params["nam"] ?? "2015";
            int numMonth = DateTime.DaysInMonth(int.Parse(nam), int.Parse(thang));
            DateTime FirstDate = new DateTime(int.Parse(nam), int.Parse(thang), 1);
            DateTime firstOfNextMonth = FirstDate.AddMonths(1);
            DateTime lastOfThisMonth = firstOfNextMonth.AddDays(-1);
            string spivot = "", spercentbynv = "", spercenttotalbyline = "", scalcsanluong = "", spivotbreak = "";

            for (int i = 1; i <= numMonth; i++)
            {
                if (string.IsNullOrEmpty(spivot)) spivot = "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";
                else spivot += "," + "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";

                if (string.IsNullOrEmpty(spivotbreak)) spivotbreak = "null [" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";
                else spivotbreak += "," + "null [" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";

                if (string.IsNullOrEmpty(spercentbynv)) spercentbynv = string.Format("cast(isnull([{0}],0)*100/8 as numeric(18,1)) [{1}]",
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()));
                else spercentbynv += "," + string.Format("cast(isnull([{0}],0)*100/8 as numeric(18,1)) [{1}]",
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()));

                if (string.IsNullOrEmpty(spercenttotalbyline)) spercenttotalbyline = string.Format("cast(sum(isnull([{0}],0))*100/8 as numeric(18,1)) [{1}]",
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()));
                else spercenttotalbyline += ", " + string.Format("cast(sum(isnull([{0}],0))*100/8 as numeric(18,1)) [{1}]",
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()));

                if (string.IsNullOrEmpty(scalcsanluong)) scalcsanluong = string.Format("case when b.[{0}]*a.[{1}] = 0 then 0 else c.[{2}]/b.[{3}]*a.[{4}] end as [{5}]",
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()));
                else scalcsanluong += "," + string.Format("case when b.[{0}]*a.[{1}] = 0 then 0 else c.[{2}]/b.[{3}]*a.[{4}] end as [{5}]",
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()),
                    (i < 10 ? "0" + (i).ToString() : (i).ToString()));
            }

            SqlParameter[] arrPara = new SqlParameter[7];
            (arrPara[0] = new SqlParameter("@stungay", SqlDbType.VarChar, 10)).Value = FirstDate.ToString("dd/MM/yyyy");
            (arrPara[1] = new SqlParameter("@sdenngay", SqlDbType.VarChar, 10)).Value = lastOfThisMonth.ToString("dd/MM/yyyy");
            (arrPara[2] = new SqlParameter("@spivot", SqlDbType.VarChar)).Value = spivot;
            (arrPara[3] = new SqlParameter("@spercentbynv", SqlDbType.VarChar)).Value = spercentbynv;
            (arrPara[4] = new SqlParameter("@spercenttotalbyline", SqlDbType.VarChar)).Value = spercenttotalbyline;
            (arrPara[5] = new SqlParameter("@scalcsanluong", SqlDbType.VarChar)).Value = scalcsanluong;
            (arrPara[6] = new SqlParameter("@spivotbreak", SqlDbType.VarChar)).Value = spivotbreak;
            DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "rpt_Kiemtrasanluong", arrPara).Tables[0];

            string sSQL = "";
            foreach (DataRow row in dt.Rows)
            {
                sSQL += row["s"].ToString();
            }
            dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.Text, sSQL).Tables[0];
            return Content(JsonConvert.SerializeObject(dt, Formatting.Indented), "application/json");
        }
    }
}
