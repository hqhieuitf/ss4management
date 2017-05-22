using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class GenCodeController : Controller
    {
        public ActionResult Index()
        {
            string sLoai = this.Request.Params["sLoai"] ?? "00";
            return Json(new { code = SS4.Models.clsDBUtil.GenCodeAuto(sLoai) }, JsonRequestBehavior.AllowGet);
        }

    }
}
