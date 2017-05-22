using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;
using System.Web.Security;

namespace SS4.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Dashboard() {
            return View();
        }

        public ActionResult Index()
        {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            if (oPara.isLogged)
                return RedirectToAction("Dashboard");
            return RedirectToAction("Login");
        }        

        public ActionResult Login() {
            return View("Login");
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return Redirect("/Home/login");
        }
        [HttpPost]
        public ActionResult Login(FormCollection collection, string ReturnUrl)
        {
            string user = collection.Get("username");
            string pass = collection.Get("password");
            string page = "";
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            
            if (!string.IsNullOrEmpty(ReturnUrl))
            {
                if (ReturnUrl.IndexOf("/") != -1)
                {
                    page = ReturnUrl.Substring(1, ReturnUrl.Length - 1);
                }
            }

            clsEmployee objEmp = (new clsEmployee()).checkLogin(user, pass);
            if (objEmp  != null) {
                System.Data.SqlClient.SqlParameter[] arrPara = new System.Data.SqlClient.SqlParameter[1];
                (arrPara[0] = new System.Data.SqlClient.SqlParameter("@para1", System.Data.SqlDbType.VarChar)).Value = objEmp.id;
                System.Data.DataSet dsPermiss = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, System.Data.CommandType.StoredProcedure, "usp_login_permission", arrPara);
                oPara.dtPermission = dsPermiss.Tables[0];

                oPara.isLogged = true;
                oPara.employee = objEmp;
                clsShared.fWriteSession(oPara);
                Session["NhanVien"] = objEmp;
                FormsAuthentication.SetAuthCookie(objEmp.emaillogin, true);

                if (page != "") return Redirect("/" + page);
                return RedirectToAction("dashboard", "home", new { id = 1 });
            }            
            
            return View("Login");
        }

        
    }
}
