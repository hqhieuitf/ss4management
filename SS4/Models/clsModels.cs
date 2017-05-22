using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace SS4.Models
{
    #region DANH-MUC
    public class clsGlobalpara
    {
        public int id { get; set; }
        public string name { get; set; }
        public int tblglobaltype_id { get; set; }
        public string p1 { get; set; }
        public string p2 { get; set; }
        public string p3 { get; set; }
        public string p4 { get; set; }
        public string p5 { get; set; }
        public DateTime lastedit { get; set; }
        public string slastedit { get { return lastedit.ToString("dd/MM/yyyy"); } }
        public int lastuser { get; set; }
        public bool isdelete { get; set; }
        public int deleteuser { get; set; }
        public DateTime deletedate { get; set; }
        public string sdeletedate { get { return deletedate.ToString("dd/MM/yyyy"); } }
        public int parentid { get; set; }
    }
    public class clsLine : clsGlobalpara {

        public List<clsGlobalpara> SelectAll() {
            return clsDBUtil.getCategorie("tblline").Tables[0].ToList<clsGlobalpara>();
        }

        public void Insert() {
            SqlParameter[] arrPara = new SqlParameter[6];
            (arrPara[0] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[1] = new SqlParameter("@p1", SqlDbType.VarChar, 5)).Value = p1;
            (arrPara[2] = new SqlParameter("@p2", SqlDbType.VarChar, 5)).Value = p2;
            (arrPara[3] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[4] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[5] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblline_insert", arrPara);
        }

        public void Update() {
            SqlParameter[] arrPara = new SqlParameter[7];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.VarChar, 5)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.VarChar, 5)).Value = p2;
            (arrPara[4] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[5] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[6] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblline_update", arrPara);
        }

        public void Delete() {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblline_delete", arrPara);
        }
    }

    

    public class clsLSXuat : clsGlobalpara {
        public List<clsGlobalpara> SelectAll()
        {
            return clsDBUtil.getCategorie("tbllsxuat").Tables[0].ToList<clsGlobalpara>();
        }
        public List<clsGlobalpara> SelectAllByDateRange(string tungay, string denngay)
        {
            return clsDBUtil.getCategorie("tbllsxuatbydaterange", false, tungay, denngay).Tables[0].ToList<clsGlobalpara>();
        }

        public List<clsGlobalpara> SelectByDate(string sdate)
        {
            return clsDBUtil.getCategorie("tbllsxuatbysdate", false, sdate, sdate).Tables[0].ToList<clsGlobalpara>();
        }

        public void InsertOrUpdate()
        {
            SqlParameter[] arrPara = new SqlParameter[4];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.NVarChar, 500)).Value = p2;
            
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tbllsxuat_insertorupdate", arrPara);
        }

        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tbllsxuat_delete", arrPara);
        }

    }


    public class clsCont : clsGlobalpara
    {
        public List<clsGlobalpara> SelectAll()
        {
            return clsDBUtil.getCategorie("tblcont").Tables[0].ToList<clsGlobalpara>();
        }

        public void InsertOrUpdate()
        {
            SqlParameter[] arrPara = new SqlParameter[3];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;

            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblcont_insertorupdate", arrPara);
        }

        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblcont_delete", arrPara);
        }

    }


    public class clsSheet : clsGlobalpara {
        public List<clsGlobalpara> SelectAll()
        {
            return clsDBUtil.getCategorie("tblsheet").Tables[0].ToList<clsGlobalpara>();
        }
    }

    public class clsProduct : clsGlobalpara {
        public List<clsGlobalpara> SelectAll()
        {
            return clsDBUtil.getCategorie("tblproduct").Tables[0].ToList<clsGlobalpara>();
        }

        public void import() {
            SqlParameter[] arrPara = new SqlParameter[6];
            (arrPara[0] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[1] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[2] = new SqlParameter("@p2", SqlDbType.VarChar, 5)).Value = p2;
            (arrPara[3] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[4] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[5] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblproduct_createorupdate", arrPara);
        }
        public void Insert()
        {
            SqlParameter[] arrPara = new SqlParameter[6];
            (arrPara[0] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[1] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[2] = new SqlParameter("@p2", SqlDbType.VarChar, 5)).Value = p2;
            (arrPara[3] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[4] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[5] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblproduct_insert", arrPara);
        }

        public void Update()
        {
            SqlParameter[] arrPara = new SqlParameter[7];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.VarChar, 5)).Value = p2;
            (arrPara[4] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[5] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[6] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblproduct_update", arrPara);
        }

        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblproduct_delete", arrPara);
        }
    }
    public class clsDept : clsGlobalpara {
        public List<clsGlobalpara> SelectAll()
        {
            return clsDBUtil.getCategorie("tbldept").Tables[0].ToList<clsGlobalpara>();
        }

        public void Insert()
        {
            SqlParameter[] arrPara = new SqlParameter[6];
            (arrPara[0] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[1] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[2] = new SqlParameter("@p2", SqlDbType.VarChar, 5)).Value = p2;
            (arrPara[3] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[4] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[5] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tbldept_insert", arrPara);
        }

        public void Update()
        {
            SqlParameter[] arrPara = new SqlParameter[7];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.VarChar, 5)).Value = p2;
            (arrPara[4] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[5] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[6] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tbldept_update", arrPara);
        }

        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tbldept_delete", arrPara);
        }
    }

    public class clsErrGroup : clsGlobalpara
    {
        public List<clsGlobalpara> SelectAll()
        {
            return clsDBUtil.getCategorie("tblerrgroup").Tables[0].ToList<clsGlobalpara>();
        }

        public void Insert()
        {
            SqlParameter[] arrPara = new SqlParameter[8];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.NVarChar, 500)).Value = p2;
            (arrPara[4] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[5] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[6] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            (arrPara[7] = new SqlParameter("@parentid", SqlDbType.Int)).Value = parentid;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblerrgroup_insert", arrPara);
        }

        public void Update()
        {
            SqlParameter[] arrPara = new SqlParameter[7];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.NVarChar, 500)).Value = p2;
            (arrPara[4] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[5] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[6] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblerrgroup_update", arrPara);
        }

        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblerrgroup_delete", arrPara);
        }
    }

    public class clsErrModifiedGroup : clsGlobalpara
    {
        public List<clsGlobalpara> SelectAll()
        {
            return clsDBUtil.getCategorie("tblerrmodifiedgroup").Tables[0].ToList<clsGlobalpara>();
        }

        public void Insert()
        {
            SqlParameter[] arrPara = new SqlParameter[8];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.NVarChar, 500)).Value = p2;
            (arrPara[4] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[5] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[6] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            (arrPara[7] = new SqlParameter("@parentid", SqlDbType.Int)).Value = parentid;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblerrmodifiedgroup_insert", arrPara);
        }

        public void Update()
        {
            SqlParameter[] arrPara = new SqlParameter[7];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@name", SqlDbType.NVarChar, 200)).Value = name;
            (arrPara[2] = new SqlParameter("@p1", SqlDbType.NVarChar, 500)).Value = p1;
            (arrPara[3] = new SqlParameter("@p2", SqlDbType.NVarChar, 500)).Value = p2;
            (arrPara[4] = new SqlParameter("@p3", SqlDbType.VarChar, 5)).Value = p3;
            (arrPara[5] = new SqlParameter("@p4", SqlDbType.VarChar, 5)).Value = p4;
            (arrPara[6] = new SqlParameter("@p5", SqlDbType.VarChar, 5)).Value = p5;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblerrgroup_update", arrPara);
        }

        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblerrgroup_delete", arrPara);
        }
    }

    public class clsEmployee
    {
        public int id { get; set; }
        public string code { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string fullname { get; set; }
        public DateTime birthday { get; set; }

        public string sbirthday { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string emaillogin { get; set; }
        public int tbldeptid { get; set; }
        public int tbllineid { get; set; }
        public bool isactive { get; set; }
        public string password { get; set; }
        public string sdept { get; set; }
        public string sline { get; set; }

        public bool isnghi { get; set; }
        public DateTime ngaynghi { get; set; }
        public string sngaynghi { get; set; }
        public string lydonghi { get; set; }


        public List<clsEmployee> SelectAll()
        {
            return clsDBUtil.getCategorie("tblemployee").Tables[0].ToList<clsEmployee>();
        }
        public clsEmployee getById(int employeeid) {
            clsEmployee objEmployee = null;
            DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.Text, "select* from tblEmployee where id=" + employeeid.ToString()).Tables[0];
            if (dt.Rows.Count != 0)
            {
                objEmployee = new clsEmployee
                {
                    id = int.Parse(dt.Rows[0]["id"].ToString()),
                    isactive = bool.Parse(dt.Rows[0]["isactive"].ToString())
                };                
            }
            return objEmployee;
        }
        public clsEmployee checkLogin(string email, string password) {
            clsEmployee objEmployee = null;
            SqlParameter[] arrPara = new SqlParameter[2];
            (arrPara[0] = new SqlParameter("@email", SqlDbType.VarChar, 100)).Value = email;
            (arrPara[1] = new SqlParameter("@password", SqlDbType.VarChar, 100)).Value = password;
            DataTable dt = SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_checklogin", arrPara).Tables[0];
            if (dt.Rows.Count != 0)
            {

                objEmployee = new clsEmployee
                {
                    id = int.Parse(dt.Rows[0]["id"].ToString()),
                    isactive = bool.Parse(dt.Rows[0]["isactive"].ToString()),
                    email = dt.Rows[0]["email"].ToString(),
                    emaillogin = dt.Rows[0]["emaillogin"].ToString(),
                    fullname = dt.Rows[0]["fullname"].ToString(),
                    tbldeptid = int.Parse(dt.Rows[0]["tbldeptid"].ToString()),
                    tbllineid = int.Parse(dt.Rows[0]["tbllineid"].ToString()),
                    sdept = dt.Rows[0]["sdept"].GetType().Name == "DBNull" ? "" : dt.Rows[0]["sdept"].ToString(),
                    sline = dt.Rows[0]["sline"].GetType().Name == "DBNull" ? "" : dt.Rows[0]["sline"].ToString(),
                };
            }
            return objEmployee;
        }

        public void InsertOrUpdate()
        {
            string[] arrStr = fullname.Split(' ');
            firstname = lastname = "";
            if (arrStr.Length > 1)
            {
                for (int i = 0; i < arrStr.Length - 1; i++)
                {
                    if (firstname == "") firstname = arrStr[i];
                    else firstname += " " + arrStr[i];
                }
                lastname = arrStr[arrStr.Length - 1];
            }
            else { firstname = lastname = arrStr[0]; }
            email = emaillogin;

            SqlParameter[] arrPara = new SqlParameter[12];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@code", SqlDbType.VarChar, 50)).Value = code;
            (arrPara[2] = new SqlParameter("@firstname", SqlDbType.NVarChar, 50)).Value = firstname;
            (arrPara[3] = new SqlParameter("@lastname", SqlDbType.NVarChar, 50)).Value = lastname;
            (arrPara[4] = new SqlParameter("@fullname", SqlDbType.NVarChar, 200)).Value = fullname;
            (arrPara[5] = new SqlParameter("@sbirthday", SqlDbType.VarChar, 10)).Value = sbirthday;
            (arrPara[6] = new SqlParameter("@mobile", SqlDbType.VarChar, 50)).Value = mobile;
            (arrPara[7] = new SqlParameter("@email", SqlDbType.VarChar, 50)).Value = email;
            (arrPara[8] = new SqlParameter("@emaillogin", SqlDbType.VarChar, 50)).Value = emaillogin;
            (arrPara[9] = new SqlParameter("@tbldeptid", SqlDbType.Int)).Value = tbldeptid;
            (arrPara[10] = new SqlParameter("@isactive", SqlDbType.Bit)).Value = isactive;
            (arrPara[11] = new SqlParameter("@tbllineid", SqlDbType.Int)).Value = tbllineid;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblemployee_insertorupdate", arrPara);
        }

        public void UpdateNgaynghi() {
            SqlParameter[] arrPara = new SqlParameter[4];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@sngaynghi", SqlDbType.VarChar, 50)).Value = sngaynghi;
            (arrPara[2] = new SqlParameter("@lydonghi", SqlDbType.NVarChar, 200)).Value = lydonghi;
            (arrPara[3] = new SqlParameter("@isnghi", SqlDbType.Bit)).Value = isnghi;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblemployee_updatengaynghi", arrPara);
        }

        public void setPassword() {
            SqlParameter[] arrPara = new SqlParameter[2];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@password", SqlDbType.VarChar, 50)).Value = password;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblemployee_setpassword", arrPara);
        }
        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblemployee_delete", arrPara);
        }
    }

    public class clsPhanquyenqlcv
    {
        public Int64 id { get; set; }
        public Int64? parent { get; set; }
        public string name { get; set; }
        public bool isSig { get; set; }
        public bool isView { get; set; }
        public bool isResource { get; set; }
        public bool isMail { get; set; }

        public bool xem { get; set; }
        public bool them { get; set; }
        public bool sua { get; set; }
        public bool xoa { get; set; }
        public bool print { get; set; }
        public bool excel { get; set; }

        public List<clsPhanquyenqlcv> children { get; set; }
        public clsPhanquyenqlcv()
        {
            children = new List<clsPhanquyenqlcv>();
        }
    }
    #endregion

    #region NGHIEP-VU
    public class clsDateKeeping
    {
        public static DataTable getDateKeepingByMY(DateTime pMonthYear)
        {
            DateTime now = pMonthYear;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            int numMonth = endDate.Day - startDate.Day + 1;
            string sList = "", sSumList = "", sSumPB = "";
            
            for (int i = 1; i <= numMonth; i++)
            {
                if (string.IsNullOrEmpty(sList)) sList = "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";
                else sList += "," + "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";

                if (string.IsNullOrEmpty(sSumList)) sSumList = "sum([" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "])";
                else sSumList += "," + "sum([" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "])";

                if (string.IsNullOrEmpty(sSumPB)) sSumPB = "sum([" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]) as " + "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";
                else sSumPB += ", sum([" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]) as " + "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";
            }
            SqlParameter[] arrPara = new SqlParameter[5];
            (arrPara[0] = new SqlParameter("@stungay", SqlDbType.VarChar, 10)).Value = startDate.ToString("dd/MM/yyyy");
            (arrPara[1] = new SqlParameter("@sdenngay", SqlDbType.VarChar, 10)).Value = endDate.ToString("dd/MM/yyyy");
            (arrPara[2] = new SqlParameter("@sgrand", SqlDbType.VarChar)).Value = sList;
            (arrPara[3] = new SqlParameter("@ssumgrand", SqlDbType.VarChar)).Value = sSumList;
            (arrPara[4] = new SqlParameter("@ssumpb", SqlDbType.VarChar)).Value = sSumPB;
            return SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tbldatekeeping_byMY", arrPara).Tables[0];
        }
        public static DataTable getDateKeepingByMYReport(DateTime pMonthYear)
        {
            DateTime now = pMonthYear;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            int numMonth = endDate.Day - startDate.Day + 1;
            string sList = "", sSumList = "", sSumPB = "";

            for (int i = 1; i <= numMonth; i++)
            {
                if (string.IsNullOrEmpty(sList)) sList = "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";
                else sList += "," + "[" + (i < 10 ? "0" + (i).ToString() : (i).ToString()) + "]";


            }
            sSumList = sSumPB = sList;


            SqlParameter[] arrPara = new SqlParameter[5];
            (arrPara[0] = new SqlParameter("@stungay", SqlDbType.VarChar, 10)).Value = startDate.ToString("dd/MM/yyyy");
            (arrPara[1] = new SqlParameter("@sdenngay", SqlDbType.VarChar, 10)).Value = endDate.ToString("dd/MM/yyyy");
            (arrPara[2] = new SqlParameter("@sgrand", SqlDbType.VarChar)).Value = sList;
            (arrPara[3] = new SqlParameter("@ssumgrand", SqlDbType.VarChar)).Value = sSumList;
            (arrPara[4] = new SqlParameter("@ssumpb", SqlDbType.VarChar)).Value = sSumPB;
            return SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tbldatekeeping_byMY_report", arrPara).Tables[0];
        }
    }
    public class clsErrCheckMrg {
        public int id { get; set; }
        public string scheckdate { get; set; }
        public int line { get; set; }
        public int sl { get; set; }

        public List<clsErrCheckMrg> SelectAll() {
            return SqlHelper.ExecuteDataset(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblErrCheckMrgMaster_selectall").Tables[0].ToList<clsErrCheckMrg>();
        }

        public void InsertOrUpdate()
        {
            SqlParameter[] arrPara = new SqlParameter[4];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@scheckdate", SqlDbType.VarChar, 10)).Value = scheckdate;
            (arrPara[2] = new SqlParameter("@line", SqlDbType.Int)).Value = line;
            (arrPara[3] = new SqlParameter("@sl", SqlDbType.Int)).Value = sl;

            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblErrCheckMrgMaster_insertorupdate", arrPara);
        }

        public void Delete()
        {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblErrCheckMrgMaster_delete", arrPara);
        }
    }
    #endregion
}