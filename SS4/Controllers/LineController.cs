﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class LineController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "Line", "index"))
            {
                return View();
            }
            else
                return View("~/views/shared/NotPermissions.cshtml");
        }

        public ActionResult Create(List<clsLine> models) {
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
        public ActionResult Update(List<clsLine> models) {
            bool bErr = false;
            string message = "";
            try
            {
                foreach (var item in models)
                {
                    item.Update();
                }
            }
            catch (Exception ex) {
                bErr = true;
                message = ex.Message;
            }


            return Json(new {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Destroy(List<clsLine> models)
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
        public ActionResult getAll() {
            List<clsGlobalpara> listResult = (new clsLine()).SelectAll();
            List<object> lst = new List<object>();
            foreach (var item in listResult) {
                lst.Add(new
                {
                    id = item.id,
                    tblglobaltype_id = item.tblglobaltype_id,
                    name = item.name,
                    p1 = item.p1,
                    p2 = item.p2,
                    p3 = item.p3,
                    p4 = item.p4,
                    p5 = item.p5
                });
            }

            return Json(new
            {
                data = lst,
                total = lst.Count
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getCate() {
            List<clsGlobalpara> listResult = (new clsLine()).SelectAll();
            List<object> lst = new List<object>();
            foreach (var item in listResult)
            {
                lst.Add(new
                {
                    id = item.id,                    
                    text = item.name,                    
                });
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }
    }
}
