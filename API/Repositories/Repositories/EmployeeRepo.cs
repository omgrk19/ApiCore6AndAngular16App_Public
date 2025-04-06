using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using DataModels.DataUtilities;
using DataModels.Models;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private readonly AppDbContext _context;
        public EmployeeRepo(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<(int, string, Employee)> GetById(int id)
        {
            try
            {

                var Employee = await _context.Employee.FindAsync(id);
                return (0, "", Employee);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<(int, string, usp_EmployeeDetails_Vm)> GetList(usp_EmployeeDetails_filter filter)
        {
            usp_EmployeeDetails_Vm usp_EmployeeDetails_Vm = new usp_EmployeeDetails_Vm();
            try
            {
                if (filter == null)
                {
                    return (404, "filter is null", null);
                }

                if (_context.Employee == null)
                {
                    return (404, "_context.Employee NotFound()", null);
                }


                string FirstName = filter.FirstName == null ? "" : filter.FirstName;
                string Mobile = filter.Mobile == null ? "" : filter.Mobile;
                int DeptId = Convert.ToInt32(filter.DepartmentId);
                int DesigId = Convert.ToInt32(filter.DesignationId);
                int Id = Convert.ToInt32(filter.Id);

                int pageNo = Convert.ToInt32(filter.pageNo);
                int pageSize = Convert.ToInt32(filter.pageSize);
                var sqlRaw = from x in _context.Employee
                             join dept in _context.Department on x.DepartmentId equals dept.Id
                                into dept_lj
                             from dept in dept_lj.DefaultIfEmpty()
                             join desig in _context.Designation on x.DesignationId equals desig.Id
                                into desig_lj
                             from desig in desig_lj.DefaultIfEmpty()
                             where (Id > 0 ? x.UserId == Id : (true))
                             && (DeptId > 0 ? x.DepartmentId == DeptId : (true))
                             && (DesigId > 0 ? x.DesignationId == DesigId : (true))
                             && (FirstName != "" ? x.FirstName.Contains(FirstName) || x.LastName.Contains(FirstName) : (true))
                             && (Mobile != "" ? x.Mobile == Mobile : (true))
                             orderby x.UserId descending
                             select (new usp_EmployeeDetails
                             {
                                 UserId = x.UserId,
                                 FirstName = x.FirstName,
                                 BirthDate = x.BirthDate,
                                 CreateOn = x.CreateOn,
                                 DesignationId = x.DesignationId,
                                 DesignationName = desig.DesignationName,
                                 DepartmentId = x.DepartmentId,
                                 DepartmentName = dept.DepartmentName,
                                 EmailId = x.EmailId,
                                 Mobile = x.Mobile,
                                 IsActive = x.IsActive,
                                 IsMaleorFemale = x.IsMaleorFemale,
                                 LastName = x.LastName,
                                 ModifieldOn = x.ModifieldOn,
                                 Password = x.Password,
                                 PhotoUrl = x.PhotoUrl,
                                 DocumentUrl = x.DocumentUrl,
                                 VideoUrl = x.VideoUrl,
                             });
                //var dataList = await dataList2.OrderBy(y => y.FirstName)
                //.Skip((pageNo - 1) * pageSize)
                //.Take(pageSize)
                //.ToListAsync();

                var sqlRawOrder = sqlRaw.OrderBy(y => y.UserId);
                var dataList = new List<usp_EmployeeDetails>();
                if (pageNo == 0 || pageSize == 0)
                    dataList = await sqlRawOrder.ToListAsync();
                else
                    dataList = await sqlRawOrder.Skip((pageNo - 1) * pageSize).Take(pageSize).ToListAsync();

                int i = 0;
                foreach (var item in dataList)
                    item.RowNo = ++i;

                usp_EmployeeDetails_Vm.EmployeeDetails_List = dataList;
                usp_EmployeeDetails_Vm.totalRecords = sqlRaw.Count();
                usp_EmployeeDetails_Vm.pageNo = pageNo;
                usp_EmployeeDetails_Vm.pageSize = pageSize;

                return (0, "", usp_EmployeeDetails_Vm);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private async Task<usp_EmployeeDetails_Vm> GetEmployeeWithStoredProcedure([FromQuery] usp_EmployeeDetails_filter filter)
        {
            usp_EmployeeDetails_Vm usp_EmployeeDetails_Vm = new usp_EmployeeDetails_Vm();
            try
            {
                if (_context.Employee == null)
                {
                    return usp_EmployeeDetails_Vm;
                }
                if (filter == null)
                {
                    return usp_EmployeeDetails_Vm;
                }

                //List<usp_EmployeeDetails> dataList2 = await _context.usp_EmployeeDetails.FromSqlInterpolated($"exec usp_EmployeeDetails @pageindex={filter.pageNo},@pagesize={filter.pageSize},@FirstName={filter.FirstName}").ToListAsync();                
                SqlParameter spTotalPage = new SqlParameter("@totalcount", SqlDbType.Int, 4) { Direction = ParameterDirection.Output };
                SqlParameter[] spList = new SqlParameter[] {
                    new SqlParameter("@pageindex", filter.pageNo),
                    new SqlParameter("@pagesize", filter.pageSize),
                    //new SqlParameter("@FirstName", filter.FirstName),
                    spTotalPage
                };

                string sql = $"exec usp_EmployeeDetails ";
                sql += "@pageindex=@pageindex,";
                sql += "@pagesize=@pagesize,";
                //sql += "@FirstName=@FirstName,";
                sql += "@totalcount=@totalcount out";
                List<usp_EmployeeDetails> dataList = await _context.usp_EmployeeDetails.FromSqlRaw(sql, spList).ToListAsync();
                usp_EmployeeDetails_Vm.EmployeeDetails_List = dataList;
                usp_EmployeeDetails_Vm.totalRecords = Convert.ToInt32(spTotalPage.Value);
                usp_EmployeeDetails_Vm.pageNo = Convert.ToInt32(filter.pageNo);
                usp_EmployeeDetails_Vm.pageSize = Convert.ToInt32(filter.pageSize);


                return usp_EmployeeDetails_Vm;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, Employee)> Add(Employee Employee)
        {
            try
            {

                if (_context.Employee == null)
                {
                    //return Problem("Entity set 'AppDbContext.Employee'  is null.");
                    return (400, "Entity set 'AppDbContext.Employee'  is null.", null);
                }

                _context.Employee.Add(Employee);
                await _context.SaveChangesAsync();
                return (0, "", Employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string)> Delete(int id)
        {
            try
            {
                if (_context.Employee == null)
                {
                    return (404, "NotFound()");
                }

                var Employee = await _context.Employee.FindAsync(id);
                if (Employee == null)
                {
                    //return NotFound();
                    return (404, "Notfound");
                }

                _context.Employee.Remove(Employee);
                await _context.SaveChangesAsync();
                return (0, "");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, Employee)> Update(int id, Employee employee)
        {

            if (id != employee.UserId)
            {
                return (400, "Invalid request", null);
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return (0, "", employee);
            }
            //catch
            //{
            //    throw;
            //}
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    //return NotFound();
                    return (404, "NotFound()", new Employee());
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<(int, string)> UpdateEmployeFile(int id, UserFileUpdate u)
        {
            var Employee = await _context.Employee.FindAsync(id);
            if (id != Employee.UserId)
            {
                return (400, "Invalid request");
            }
            if (u.Type.ToLower() == "image")
            {
                Employee.PhotoUrl = u.FilePath;
            }
            if (u.Type.ToLower() == "document")
            {
                Employee.DocumentUrl = u.FilePath;
            }
            if (u.Type.ToLower() == "video")
            {
                Employee.VideoUrl = u.FilePath;
            }
            _context.Entry(Employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!EmployeeExists(id))
            //    {
            //        return "Not found";
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}
            return (0, "");
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employee?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
