using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class ProductController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "Product", "index"))
            {
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }
        public ActionResult Import(List<clsProduct> models) {
            bool bErr = false;
            string message = "";
            try
            {
                foreach (var item in models)
                {
                    item.import();
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
        public ActionResult Create(List<clsProduct> models)
        {
            bool bErr = false;
            string message = "";
            try
            {
                foreach (var item in models)
                {
                    item.Insert();
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
        public ActionResult Update(List<clsProduct> models)
        {
            bool bErr = false;
            string message = "";
            try
            {
                foreach (var item in models)
                {
                    item.Update();
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
        public ActionResult Destroy(List<clsProduct> models)
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
            List<clsGlobalpara> listResult = (new clsProduct()).SelectAll();
            List<object> lst = new List<object>();
            foreach (var item in listResult)
            {
                lst.Add(new
                {
                    id = item.id,
                    name = item.name,
                    p1 = item.p1,
                    p2 = string.IsNullOrEmpty(item.p2) ? "0" : item.p2,
                    p3 = string.IsNullOrEmpty(item.p3) ? "0" : item.p3,
                    p4 = item.p4,
                    p5 = item.p5,
                    //20170524 HieuHQ Add Start
                    p6 = item.p6,
                    p7 = item.p7,
                    p8 = item.p8
                    //20170524 HieuHQ Add End
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
