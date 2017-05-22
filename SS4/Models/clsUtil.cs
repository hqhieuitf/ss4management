using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SS4.Models;

public static class clsShared
{
    public struct SESSION_PARA
    {
        public string KeySysId;
        public string SessionID;
        public bool isLogged;
        public bool isAdmin;
        public string userName;
        public string firstName;
        public string lastName;
        public string HostName;
        public string userAgent;
        public string userAgentSearchEngine;
        public bool isWrittenLog;
        public bool IsMobile;
        public string MobileModel;
        public string NhomDomain;

        public string lang;
        public string ERR;
        public string SSS;

        public clsEmployee employee;

        public DataTable dtPermission;
        public DataTable dtPermissionExt;
        public int pPhanQuyen;        

        public int currentpage;
        public int howmanyrows;
        public int totalpage;

        public string sMenuTop;        
    }
    public static SESSION_PARA fReadSession()
    {
        try { return (SESSION_PARA)HttpContext.Current.Session["_THACO_IS_SESSION_PARA"]; }
        catch { return new SESSION_PARA(); }
    }
    public static void fWriteSession(SESSION_PARA _sessionPara)
    {
        try
        {
            HttpContext.Current.Session["_THACO_IS_SESSION_PARA"] = _sessionPara;
        }
        catch (Exception ex) { ex.Data.Clear(); }
    }
    public static bool checkPermission(string mod = "them", string controller = "", string action = "")
    {
        try
        {
            clsShared.SESSION_PARA oPara = clsShared.fReadSession();
            string sfilter = "";
            switch (mod.ToLower())
            {
                case "them": sfilter = string.Format("controller='{0}' and action='{1}' and them=1", controller, action); break;
                case "sua": sfilter = string.Format("controller='{0}' and action='{1}' and sua=1", controller, action); break;
                case "xoa": sfilter = string.Format("controller='{0}' and action='{1}' and xoa=1", controller, action); break;
                case "xem": sfilter = string.Format("controller='{0}' and action='{1}' and xem=1", controller, action); break;
                case "print": sfilter = string.Format("controller='{0}' and action='{1}' and print=1", controller, action); break;
                case "excel": sfilter = string.Format("controller='{0}' and action='{1}' and excel=1", controller, action); break;
            }
            DataRow[] arrRow = oPara.dtPermission.Select(sfilter);
            return arrRow.Length != 0;
        }
        catch { return false; }
    }
}
public class CustomAuthorize : System.Web.Mvc.AuthorizeAttribute
{
    protected override bool AuthorizeCore(HttpContextBase httpContext)
    {
        var authroized = base.AuthorizeCore(httpContext);
        var rd = httpContext.Request.RequestContext.RouteData;
        string currentAction = rd.GetRequiredString("action");
        string currentController = rd.GetRequiredString("controller");        

        if (!authroized)
        {            
            return false;
        }
        
        var myvar = httpContext.Session["NhanVien"];
        return myvar != null;
    }
}


namespace SS4.Models
{
    public class clsDBUtil
    {
        public static int DN_LINE = 1;        
        public static int DN_PRODUCT = 2;    
        public static int DN_ERR = 3;         
        public static int DN_DEPT = 4;        
        public static int DN_LSX = 5;         
        public static int DN_ERR_MODIFIED = 6;   
        public static int DN_SHEET = 7;          
        public static int DN_CONT = 8;           

        public static DataSet getCategorie(string tablename, bool hasPaging = false, string para1 = "", string para2 = "", string para3 = "", string para4 = "", string para5 = "")
        {
            SqlParameter[] arrPara = new SqlParameter[7];
            (arrPara[0] = new SqlParameter("@catname", SqlDbType.VarChar)).Value = tablename;
            (arrPara[1] = new SqlParameter("@paging", SqlDbType.Bit)).Value = hasPaging;
            (arrPara[2] = new SqlParameter("@para1", SqlDbType.VarChar)).Value = para1;
            (arrPara[3] = new SqlParameter("@para2", SqlDbType.VarChar)).Value = para2;
            (arrPara[4] = new SqlParameter("@para3", SqlDbType.VarChar)).Value = para3;
            (arrPara[5] = new SqlParameter("@para4", SqlDbType.VarChar)).Value = para4;
            (arrPara[6] = new SqlParameter("@para5", SqlDbType.VarChar)).Value = para5;

            return SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_categorieList", arrPara);
        }
        public static DataSet getPhanQuyen(string tablename, bool hasPaging = false, string para1 = "", string para2 = "", string para3 = "", string para4 = "", string para5 = "",
            int page = 0, int pagesize = 15, string sfilter = "1=1", string ssort = "")
        {
            SqlParameter[] arrPara = new SqlParameter[11];
            (arrPara[0] = new SqlParameter("@catname", SqlDbType.VarChar)).Value = tablename;
            (arrPara[1] = new SqlParameter("@paging", SqlDbType.Bit)).Value = hasPaging;
            (arrPara[2] = new SqlParameter("@para1", SqlDbType.VarChar)).Value = para1;
            (arrPara[3] = new SqlParameter("@para2", SqlDbType.VarChar)).Value = para2;
            (arrPara[4] = new SqlParameter("@para3", SqlDbType.VarChar)).Value = para3;
            (arrPara[5] = new SqlParameter("@para4", SqlDbType.VarChar)).Value = para4;
            (arrPara[6] = new SqlParameter("@para5", SqlDbType.VarChar)).Value = para5;
            (arrPara[7] = new SqlParameter("@page", SqlDbType.Int)).Value = page;
            (arrPara[8] = new SqlParameter("@pagesize", SqlDbType.Int)).Value = pagesize;
            (arrPara[9] = new SqlParameter("@sfilter", SqlDbType.NVarChar)).Value = sfilter;
            (arrPara[10] = new SqlParameter("@ssort", SqlDbType.VarChar)).Value = ssort;

            return SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_phanquyenList", arrPara);
        }
        public static string GenCodeAuto(string sLoai)
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@code", SqlDbType.VarChar, 10)).Value = sLoai;
            return SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_gencode", arrPara).Tables[0].Rows[0][0].ToString();
        }
    }
    public static class DataTableExtensions
    {
        public static List<TSource> ToList<TSource>(this DataTable dataTable) where TSource : new()
        {
            var dataList = new List<TSource>();

            const BindingFlags flags = BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic;
            var objFieldNames = (from PropertyInfo aProp in typeof(TSource).GetProperties(flags)
                                 select new
                                 {
                                     Name = aProp.Name,
                                     Type = Nullable.GetUnderlyingType(aProp.PropertyType) ??
                             aProp.PropertyType
                                 }).ToList();
            var dataTblFieldNames = (from DataColumn aHeader in dataTable.Columns
                                     select new
                                     {
                                         Name = aHeader.ColumnName,
                                         Type = aHeader.DataType
                                     }).ToList();
            var commonFields = objFieldNames.Intersect(dataTblFieldNames).ToList();

            foreach (DataRow dataRow in dataTable.AsEnumerable().ToList())
            {
                var aTSource = new TSource();
                foreach (var aField in commonFields)
                {
                    PropertyInfo propertyInfos = aTSource.GetType().GetProperty(aField.Name);
                    var value = (dataRow[aField.Name] == DBNull.Value) ?
                    null : dataRow[aField.Name]; 
                    propertyInfos.SetValue(aTSource, value, null);
                }
                dataList.Add(aTSource);
            }
            return dataList;
        }
    }

    public static class TreeNodeExtensions
    {
        public static clsPhanquyenqlcv ToTreePhanquyenqlcv(this List<clsPhanquyenqlcv> list)
        {
            if (list == null) throw new ArgumentNullException("list");
            var root = list.SingleOrDefault(x => x.parent == null);
            if (root == null) throw new InvalidOperationException("root == null");

            PopulatePhanquyenqlcvChildren(root, list);

            return root;
        }
        public static void PopulatePhanquyenqlcvChildren(clsPhanquyenqlcv node, List<clsPhanquyenqlcv> all)
        {
            var childs = all.Where(x => x.parent.Equals(node.id)).ToList();

            foreach (var item in childs)
            {
                node.children.Add(item);
            }

            foreach (var item in childs)
                all.Remove(item);

            foreach (var item in childs)
                PopulatePhanquyenqlcvChildren(item, all);
        }
    }
}