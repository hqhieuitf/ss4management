using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class ErrDataMrgController : Controller
    {
        public ActionResult Index()
        {

            if (clsShared.checkPermission("xem", "ErrDataMrg", "index"))
            {
                ViewData["tblProduct"] = (new clsProduct()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name + " # " + item.p1
                }).ToList();

                ViewData["tblEmployee"] = (new clsEmployee()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.code + " # " + item.fullname
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

        public ActionResult SelectAll() {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            return Content(clsDBUtil.getCategorie("tbllisterrdata", false, oPara.employee.id.ToString()).Tables[0].Rows[0][0].ToString(), "application/json");
        }
        public ActionResult SelectAllByDateRange(string tungay, string denngay)
        {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            return Content(clsDBUtil.getCategorie("tbllisterrdatabydaterange", false, oPara.employee.id.ToString(), tungay, denngay).Tables[0].Rows[0][0].ToString(), "application/json");
        }
        public ActionResult SelectDataForm() {
            string MasterId = Request.Params["masterid"] ?? "0";
            System.Data.DataSet ds = (new clsErrDataMrgMaster()).SelectForm_ByMasterId(MasterId);
            return Json(new
            {
                master = ds.Tables[0].ToList<clsErrDataMrgMaster>(),
                detail = ds.Tables[1].ToList<clsErrDetailByMaster>(),
                detailepe = ds.Tables[2].ToList<clsErrDetailEpeByMaster>(),
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CreateOrUpdate(clsErrDataMrgMaster master, List<clsErrDataMrgDetail> detail,
            List<clsErrDataMrgDetailEPE> detailEPE) {
            bool bErr = false;
            string message = "";
            try
            {
                int masterid = master.InsertOrUpdate();
                if (detail != null)
                {
                    foreach (var item in detail)
                    {
                        item.masterid = masterid;
                        item.Insert();
                    }
                }

                if (detailEPE != null) {
                    foreach (var item in detailEPE)
                    {
                        item.masterid = masterid;
                        item.Insert();
                    }
                }
            }
            catch (Exception ex) {
                bErr = true;
                message = ex.Message;
            }

            return Json(new
            {
                err = bErr,
                msg = message
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Delete() {
            bool bErr = false;
            string message = "";
            try
            {
                clsErrDataMrgMaster o = new clsErrDataMrgMaster();
                o.id = int.Parse(Request.Params["masterid"] ?? "0");

                o.Delete();
            }
            catch (Exception ex) {
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
