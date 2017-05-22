using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class ErrCheckMrgController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "ErrCheckMrg", "index"))
            {
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

        public ActionResult CreateOrUpdate(List<clsErrCheckMrg> models)
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

        public ActionResult Destroy(List<clsErrCheckMrg> models)
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
            List<clsErrCheckMrg> listResult = (new clsErrCheckMrg()).SelectAll();            

            return Json(new
            {
                data = listResult,
                total = listResult.Count
            }, JsonRequestBehavior.AllowGet);
        }

    }
}
