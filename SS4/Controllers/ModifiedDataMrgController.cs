using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SS4.Models;

namespace SS4.Controllers
{
    [CustomAuthorize]
    public class ModifiedDataMrgController : Controller
    {
        public ActionResult Index()
        {
            if (clsShared.checkPermission("xem", "ModifiedDataMrg", "index"))
            {
                ViewData["tblProduct"] = (new clsProduct()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name + " - " + item.p1
                }).ToList();

                ViewData["tblSheet"] = (new clsSheet()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.name + " - " + item.p1
                }).ToList();

                ViewData["tblEmployee"] = (new clsEmployee()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = item.code + " - " + item.fullname
                }).ToList();

                ViewData["tblCont"] = (new clsCont()).SelectAll().Select(item => new
                {
                    id = item.id,
                    name = string.Format("[{0}] - {1}", item.p1, item.name)
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

        public ActionResult SelectAll()
        {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            return Content(clsDBUtil.getCategorie("tbllistmodifieddata", false, oPara.employee.id.ToString()).Tables[0].Rows[0][0].ToString(), "application/json");
        }
        public ActionResult SelectAllByDateRange(string tungay, string denngay)
        {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            return Content(clsDBUtil.getCategorie("tbllistmodifieddatabydaterange", false, oPara.employee.id.ToString(), tungay, denngay).Tables[0].Rows[0][0].ToString(), "application/json");
        }
        public ActionResult SelectDataForm()
        {
            string MasterId = Request.Params["masterid"] ?? "0";
            System.Data.DataSet ds = (new clsModifiedDataMrgMaster()).SelectForm_ByMasterId(MasterId);
            return Json(new
            {
                master = ds.Tables[0].ToList<clsModifiedDataMrgMaster>(),                
                detail1 = ds.Tables[1].ToList<clsModifiedDetailByMaster>(),//tui chinh sua
                detail2 = ds.Tables[2].ToList<clsModifiedDetailByMaster>(),//tui lua lai
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CreateOrUpdate(clsModifiedDataMrgMaster master, List<clsModifiedDataMrgDetail> detail1, List<clsModifiedDataMrgDetail> detail2)
        {
            bool bErr = false;
            string message = "";
            try
            {
                int masterid = master.InsertOrUpdate();
                //tui chinh sua
                if (detail1 != null)
                {
                    foreach (var item in detail1)
                    {
                        if (item.errcodeid != 0)
                        {
                            item.masterid = masterid;
                            item.itype = 1;
                            item.Insert();
                        }
                    }
                }

                //tui lua lai
                if (detail2 != null)
                {
                    foreach (var item in detail2)
                    {
                        if (item.errcodeid != 0)
                        {
                            item.masterid = masterid;
                            item.itype = 2;
                            item.Insert();
                        }
                    }
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
        [HttpPost]
        public ActionResult Delete()
        {
            bool bErr = false;
            string message = "";
            try
            {
                clsModifiedDataMrgMaster o = new clsModifiedDataMrgMaster();
                o.id = int.Parse(Request.Params["masterid"] ?? "0");

                o.Delete();
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
