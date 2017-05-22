using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;
using System.Data;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class PermissionController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult phanquyenpttt(FormCollection oForm)
        {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            System.Data.DataTable data;
            string message = "";
            string page = Request.Params["pageCurrent"] ?? "index",
                ajaxData = Request.Params["ajaxData"] ?? "false",
                iframe = Request.Params["isFrame"] ?? "false";
            System.Data.SqlClient.SqlParameter[] arrPara;
            if (Request.IsAjaxRequest() || bool.Parse(iframe))
            {
                ViewBag.page = page;
                ViewBag.para1 = Request.Params["para1"] ?? "0";
                ViewBag.para2 = Request.Params["para2"] ?? "0";
                ViewBag.para3 = Request.Params["para3"] ?? "0";
                ViewBag.para4 = Request.Params["para4"] ?? "0";
                ViewBag.para5 = Request.Params["para5"] ?? "0";

                switch (page)
                {
                    case "loadRolePermis":
                        data = clsDBUtil.getCategorie("PermisByEmployee", false, Request.Params["nhanvienid"] ?? "0").Tables[0];
                        List<clsPhanquyenqlcv> list = data.ToList<clsPhanquyenqlcv>();
                        return Json(list.ToTreePhanquyenqlcv().children, JsonRequestBehavior.AllowGet);
                    case "loadRolePermisDG":
                        arrPara = new System.Data.SqlClient.SqlParameter[1];
                        (arrPara[0] = new System.Data.SqlClient.SqlParameter("@nhanvienid", SqlDbType.Int)).Value = Request.Params["nhanvienId"];
                        DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_employee_getpermissiondept", arrPara).Tables[0];
                        DataTable dtline = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_employee_getpermissionline", arrPara).Tables[0];

                        return Json(new
                        {
                            dept = Newtonsoft.Json.JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.Indented),
                            line = Newtonsoft.Json.JsonConvert.SerializeObject(dtline, Newtonsoft.Json.Formatting.Indented)
                        }, JsonRequestBehavior.AllowGet);                        
                    case "updateRolePermis":
                        try
                        {
                            arrPara = new System.Data.SqlClient.SqlParameter[8];
                            (arrPara[0] = new System.Data.SqlClient.SqlParameter("@nhanvienid", SqlDbType.BigInt)).Value = Request.Params["nhanvienId"];
                            (arrPara[1] = new System.Data.SqlClient.SqlParameter("@menuid", SqlDbType.BigInt)).Value = Request.Params["menuId"];
                            (arrPara[2] = new System.Data.SqlClient.SqlParameter("@xem", SqlDbType.Bit)).Value = bool.Parse(Request.Params["xem"]);
                            (arrPara[3] = new System.Data.SqlClient.SqlParameter("@them", SqlDbType.Bit)).Value = bool.Parse(Request.Params["them"]);
                            (arrPara[4] = new System.Data.SqlClient.SqlParameter("@sua", SqlDbType.Bit)).Value = bool.Parse(Request.Params["sua"]);
                            (arrPara[5] = new System.Data.SqlClient.SqlParameter("@xoa", SqlDbType.Bit)).Value = bool.Parse(Request.Params["xoa"]);
                            (arrPara[6] = new System.Data.SqlClient.SqlParameter("@print", SqlDbType.Bit)).Value = bool.Parse(Request.Params["print"]);
                            (arrPara[7] = new System.Data.SqlClient.SqlParameter("@excel", SqlDbType.Bit)).Value = bool.Parse(Request.Params["excel"]);

                            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_pttt_updatephanquyen", arrPara);
                        }
                        catch { return Json(new { success = false }, "text/plain"); }
                        return Json(new { success = true }, "text/plain");
                    default:
                        return Content("[]", "application/json");
                }
            }

            return View();
        }

        [HttpPost]
        public ActionResult SavePermissDG()
        {
            if (clsShared.checkPermission("them", "permission", "index") || clsShared.checkPermission("sua", "permission", "index"))
            {
                string sNhanvienID = Request.Params["ID"] ?? "0";
                string sPermiss = Request.Params["lstDV"] ?? "";
                string sLine = Request.Params["lstLine"] ?? "";
                System.Data.SqlClient.SqlParameter[] arrPara = new System.Data.SqlClient.SqlParameter[3];
                (arrPara[0] = new System.Data.SqlClient.SqlParameter("@nhanvienid", SqlDbType.BigInt)).Value = sNhanvienID;
                (arrPara[1] = new System.Data.SqlClient.SqlParameter("@sDonvi", SqlDbType.VarChar)).Value = sPermiss;
                (arrPara[2] = new System.Data.SqlClient.SqlParameter("@sLine", SqlDbType.VarChar)).Value = sLine;

                SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_employee_updatepermissiondept", arrPara);
                return Json(1, JsonRequestBehavior.AllowGet);
            }
            return Json(0, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult SaveOwnPassword(int nhanvienid, string password)
        {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            if (oPara.employee.id == nhanvienid)
            {
                System.Data.SqlClient.SqlParameter[] arrPara = new System.Data.SqlClient.SqlParameter[2];
                (arrPara[0] = new System.Data.SqlClient.SqlParameter("@nhanvienid", SqlDbType.Int)).Value = nhanvienid;
                (arrPara[1] = new System.Data.SqlClient.SqlParameter("@password", SqlDbType.VarChar, 100)).Value = password;

                SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_employee_setpassword", arrPara);
                return Json(1, JsonRequestBehavior.AllowGet);
            }
            return Json(0, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SavePassword(int nhanvienid, string password) {
            if (clsShared.checkPermission("them", "permission", "index") || clsShared.checkPermission("sua", "permission", "index"))
            {
                System.Data.SqlClient.SqlParameter[] arrPara = new System.Data.SqlClient.SqlParameter[2];
                (arrPara[0] = new System.Data.SqlClient.SqlParameter("@nhanvienid", SqlDbType.Int)).Value = nhanvienid;
                (arrPara[1] = new System.Data.SqlClient.SqlParameter("@password", SqlDbType.VarChar,100)).Value = password;

                SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_employee_setpassword", arrPara);
                return Json(1, JsonRequestBehavior.AllowGet);
            }
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}
