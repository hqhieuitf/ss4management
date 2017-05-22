using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class LSXuatController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "LSXuat", "index"))
            {
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }

        public ActionResult CreateOrUpdate(List<clsLSXuat> models)
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
                bErr = true;
                message = ex.Message;
            }

            return Json(new
            {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Destroy(List<clsLSXuat> models)
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

        public ActionResult getAll()
        {
            List<clsGlobalpara> listResult = (new clsLSXuat()).SelectAll();
            List<object> lst = new List<object>();
            foreach (var item in listResult)
            {
                lst.Add(new
                {
                    id = item.id,
                    name = item.name,
                    p1 = item.p1,
                    p2 = item.p2
                });
            }

            return Json(new
            {
                data = lst,
                total = lst.Count
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getAllByDateRange(string tungay, string denngay)
        {
            List<clsGlobalpara> listResult = (new clsLSXuat()).SelectAllByDateRange(tungay, denngay);
            List<object> lst = new List<object>();
            foreach (var item in listResult)
            {
                lst.Add(new
                {
                    id = item.id,
                    name = item.name,
                    p1 = item.p1,
                    p2 = item.p2
                });
            }

            return Json(new
            {
                data = lst,
                total = lst.Count
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
