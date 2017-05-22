using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
namespace SS4.Models
{
    public class clsErrDataMrgMaster
    {
        public int id { get; set; }
        public string code { get; set; }
        public int contid { get; set; }
        public int lsxid { get; set; }
        public int productid { get; set; }
        public int lineid { get; set; }
        public DateTime checkdate { get; set; }
        public string scheckdate { get; set; }
        public int roll { get; set; }
        public int checkbag { get; set; }
        public int goodbag { get; set; }
        public int employeeid { get; set; }
        public double scrap { get; set; }
        public int timeno { get; set; }

        
        public DataSet SelectForm_ByMasterId(string MasterId) {
            return clsDBUtil.getCategorie("tblerrdataforform", false, MasterId);
        }

        
        public int InsertOrUpdate()
        {
            SqlParameter[] arrPara = new SqlParameter[14];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            (arrPara[1] = new SqlParameter("@code", SqlDbType.NVarChar, 20)).Value = code;
            (arrPara[2] = new SqlParameter("@contid", SqlDbType.Int)).Value = contid;
            (arrPara[3] = new SqlParameter("@productid", SqlDbType.Int)).Value = productid;
            (arrPara[4] = new SqlParameter("@lineid", SqlDbType.Int)).Value = lineid;
            (arrPara[5] = new SqlParameter("@scheckdate", SqlDbType.VarChar)).Value = scheckdate;
            (arrPara[6] = new SqlParameter("@roll", SqlDbType.Int)).Value = roll;
            (arrPara[7] = new SqlParameter("@checkbag", SqlDbType.Int)).Value = checkbag;
            (arrPara[8] = new SqlParameter("@goodbag", SqlDbType.Int)).Value = goodbag;
            (arrPara[9] = new SqlParameter("@employeeid", SqlDbType.Int)).Value = employeeid;
            (arrPara[10] = new SqlParameter("@scrap", SqlDbType.Decimal)).Value = scrap;
            (arrPara[11] = new SqlParameter("@timeno", SqlDbType.Int)).Value = timeno;
            (arrPara[12] = new SqlParameter("@output", SqlDbType.Int)).Direction = ParameterDirection.Output;
            (arrPara[13] = new SqlParameter("@lsxid", SqlDbType.Int)).Value = lsxid;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblErrDataMrgMaster_insertorupdate", arrPara);

            return int.Parse(arrPara[12].Value.ToString());
        }

        public void Delete() {
            SqlParameter[] arrPara = new SqlParameter[1];
            (arrPara[0] = new SqlParameter("@id", SqlDbType.Int)).Value = id;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblErrDataMrgMaster_delete", arrPara);
        }
    }

    public class clsErrDetailByMaster {
        public int group { get; set; }
        public string code { get; set; }
        public string desc { get; set; }
        public string condition { get; set; }
        public string note { get; set; }
        public int qty { get; set; }
        public int errid { get; set; }
        public int masterid { get; set; }
    }
    public class clsErrDetailEpeByMaster
    {
        public int employeeid { get; set; }
        public string fullname { get; set; }       
        public int qty { get; set; }
        public string note { get; set; }
        public int masterid { get; set; }
    }
    public class clsErrDataMrgDetail
    {
        public Int64 id { get; set; }
        public int errcodeid { get; set; }
        public int qty { get; set; }
        public string note { get; set; }
        public int masterid { get; set; }

        public void Insert()
        {
            SqlParameter[] arrPara = new SqlParameter[4];
            (arrPara[0] = new SqlParameter("@errcodeid", SqlDbType.Int)).Value = errcodeid;
            (arrPara[1] = new SqlParameter("@qty", SqlDbType.Int)).Value = qty;
            (arrPara[2] = new SqlParameter("@note", SqlDbType.NVarChar, 200)).Value = note;
            (arrPara[3] = new SqlParameter("@masterid", SqlDbType.Int)).Value = masterid;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblErrDataMrgDetail_insert", arrPara);
        }


    }
    public class clsErrDataMrgDetailEPE
    {
        public int employeeid { get; set; }
        public int qty { get; set; }
        public string note { get; set; }
        public int masterid { get; set; }

        public void Insert()
        {
            SqlParameter[] arrPara = new SqlParameter[4];
            (arrPara[0] = new SqlParameter("@employeeid", SqlDbType.Int)).Value = employeeid;
            (arrPara[1] = new SqlParameter("@qty", SqlDbType.Int)).Value = qty;
            (arrPara[2] = new SqlParameter("@note", SqlDbType.NVarChar, 200)).Value = note;
            (arrPara[3] = new SqlParameter("@masterid", SqlDbType.Int)).Value = masterid;
            SqlHelper.ExecuteNonQuery(SqlHelper.ConnectionString, CommandType.StoredProcedure, "usp_tblErrDataMrgDetailEPE_insert", arrPara);
        }


    }
}