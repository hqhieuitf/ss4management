using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class ContController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "cont", "index"))
                return View();
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }

        public ActionResult CreateOrUpdate(List<clsCont> models)
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

        public ActionResult Destroy(List<clsCont> models)
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
            List<clsGlobalpara> listResult = (new clsCont()).SelectAll();
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
