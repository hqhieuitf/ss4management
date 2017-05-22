using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class EmployeeController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "Employee", "index"))
            {
                List<clsGlobalpara> lstLine = (new clsLine()).SelectAll();
                List<object> lstLineResult = new List<object>();
                foreach (var item in lstLine)
                    lstLineResult.Add(new { id = item.id, name = item.name });
                ViewData["line"] = lstLineResult;

                List<clsGlobalpara> lstDept = (new clsDept()).SelectAll();
                List<object> lstDeptResult = new List<object>();
                foreach (var item in lstDept)
                    lstDeptResult.Add(new { id = item.id, name = item.p1 });
                ViewData["dept"] = lstDeptResult;

                return View();
            }                
            else
                return View("~/views/shared/NotPermissions.cshtml");
            
        }
        public ActionResult CreateOrUpdate(List<clsEmployee> models)
        {
            bool bErr = false;
            string message = "";
            try
            {
                foreach (var item in models)
                {
                    item.InsertOrUpdate();
                }
            }
            catch (Exception ex)
            {
                bErr = false;
                message = ex.Message;
            }

            return Json(new
            {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Destroy(List<clsEmployee> models)
        {
            bool bErr = false;
            string message = "";
            try
            {
                foreach (var item in models)
                {
                    item.Delete();
                }
            }
            catch (Exception ex)
            {
                bErr = true;
                message = ex.Message;
            }


            return Json(new
            {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult setPassword(List<clsEmployee> models)
        {
            bool bErr = false;
            string message = "";
            try
            {
                foreach (var item in models)
                {
                    item.setPassword();
                }
            }
            catch (Exception ex)
            {
                bErr = true;
                message = ex.Message;
            }


            return Json(new
            {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getAll()
        {
            List<clsEmployee> listResult = (new clsEmployee()).SelectAll();
            List<object> lst = new List<object>();
            foreach (var item in listResult)
            {
                lst.Add(new
                {
                    id = item.id,
                    code = item.code,
                    tbldeptid = item.tbldeptid,
                    fullname = item.fullname,
                    emaillogin = item.emaillogin,
                    mobile = item.mobile,
                    sbirthday = item.birthday.ToString("dd/MM/yyyy"),
                    isactive = item.isactive,
                    tbllineid = item.tbllineid,
                    isnghi = item.isnghi,
                    sngaynghi = item.ngaynghi.ToString("dd/MM/yyyy"),
                    lydonghi = item.lydonghi
                });
            }

            return Json(new
            {
                data = lst,
                total = lst.Count
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getCate() {
            List<clsEmployee> listResult = (new clsEmployee()).SelectAll();
            List<object> lst = new List<object>();
            foreach (var item in listResult)
            {
                lst.Add(new
                {
                    id = item.id,                    
                    fullname = item.fullname
                });
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }



        public ActionResult UpdateNgaynghi(clsEmployee master)
        {
            bool bErr = false;
            string message = "";
            try
            {
                master.UpdateNgaynghi();
            }
            catch (Exception ex)
            {
                bErr = true;
                message = ex.Message;
            }

            return Json(new
            {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
