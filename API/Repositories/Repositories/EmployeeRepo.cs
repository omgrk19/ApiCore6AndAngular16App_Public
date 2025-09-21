using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using DataModels.DataUtilities;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using DataModels.FilterModels;
using AutoMapper;

namespace Repositories.Repositories
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public EmployeeRepo(AppDbContext context, IMapper mapper)
        {
            this._context = context;
            _mapper = mapper;
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

        //public async Task<(int, string, usp_EmployeeDetails_Vm)> GetList(EmployeeFilter filter)
        public async Task<(int, string, Employee_Vm)> GetList(EmployeeFilter filter)
        {
            //usp_EmployeeDetails_Vm usp_EmployeeDetails_Vm = new usp_EmployeeDetails_Vm();
            Employee_Vm employee_Vm = new Employee_Vm();
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
                             && (FirstName != "" ? x.FirstName.StartsWith(FirstName) || x.LastName.StartsWith(FirstName) : (true))
                             && (Mobile != "" ? x.Mobile == Mobile : (true))
                             orderby x.UserId descending
                             //select (new usp_EmployeeDetails
                             select (new Employee
                             {
                                 UserId = x.UserId,
                                 FirstName = x.FirstName,
                                 BirthDate = x.BirthDate,
                                 CreatedOn = x.CreatedOn ?? null,
                                 CreatedBy = x.CreatedBy ?? null,
                                 DesignationId = x.DesignationId,
                                 //DesignationName = desig.DesignationName,  //for usp_EmployeeDetails
                                 DepartmentId = x.DepartmentId,
                                 //DepartmentName = dept.DepartmentName,   //for usp_EmployeeDetails
                                 EmailId = x.EmailId,
                                 Mobile = x.Mobile,
                                 IsActive = x.IsActive,
                                 IsMarried = x.IsMarried,
                                 Gender = x.Gender,
                                 LastName = x.LastName,
                                 ModifiedOn = x.ModifiedOn,
                                 ModifiedBy = x.ModifiedBy,
                                 Password = x.Password,
                                 PhotoUrl = x.PhotoUrl,
                                 DocumentUrl = x.DocumentUrl,
                                 VideoUrl = x.VideoUrl,
                                 Department = new Department
                                 {                                     
                                     DepartmentName = dept.DepartmentName ?? null,
                                     CreatedBy = dept.CreatedBy ?? null,
                                     CreatedOn = dept.CreatedOn ?? null,
                                     ModifiedBy = dept.ModifiedBy ?? null,
                                     ModifiedOn = dept.ModifiedOn ?? null,
                                 } ?? null,
                                 Designation = new Designation
                                 {
                                     //Id = desig.Id,
                                     DesignationName = desig.DesignationName ?? null,
                                     CreatedBy = desig.CreatedBy ?? null,
                                     CreatedOn = desig.CreatedOn ?? null,
                                     ModifiedBy = desig.ModifiedBy ?? null,
                                     ModifiedOn = desig.ModifiedOn ?? null,
                                 } ?? null
                             });
                //var dataList = await dataList2.OrderBy(y => y.FirstName)
                //.Skip((pageNo - 1) * pageSize)
                //.Take(pageSize)
                //.ToListAsync();

                var sqlRawOrder = sqlRaw.OrderByDescending(y => y.UserId);
                //var dataList = new List<usp_EmployeeDetails>();
                var dataList = new List<Employee>();
                if (pageNo == 0 || pageSize == 0)
                    dataList = await sqlRawOrder.ToListAsync();
                else
                    dataList = await sqlRawOrder.Skip((pageNo - 1) * pageSize).Take(pageSize).ToListAsync();

                int i = 0;
                //foreach (var item in dataList)
                //    item.RowNo = ++i;

                employee_Vm.EmployeeDetails_List = dataList;
                employee_Vm.totalRecords = sqlRaw.Count();
                employee_Vm.pageNo = pageNo;
                employee_Vm.pageSize = pageSize;

                //return (0, "", usp_EmployeeDetails_Vm);
                return (0, "", employee_Vm);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private async Task<usp_EmployeeDetails_Vm> GetEmployeeWithStoredProcedure([FromQuery] EmployeeFilter filter)
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

        public async Task<(int, string, Employee)> Add(Employee employee)
        {
            try
            {

                if (_context.Employee == null)
                {
                    //return Problem("Entity set 'AppDbContext.Employee'  is null.");
                    return (400, "Entity set 'AppDbContext.Employee'  is null.", null);
                }

                //if(!_context.Department.Any(x => x.Id == employee.DepartmentId))
                var dept = await _context.Department.FindAsync(employee.DepartmentId);
                if (dept is null)
                {
                    return (400, "Invalid Department Code.", null);
                }
                //if(!_context.Designation.Any(x => x.Id == employee.DesignationId))
                var desig = await _context.Designation.FindAsync(employee.DesignationId);
                if (desig is null)
                {
                    return (400, "Invalid Designation Code.", null);
                }
                if (!_context.ManageDesig.Any(x => x.DesignationId == employee.DesignationId && x.DepartmentId == employee.DepartmentId))
                {
                    return (400, "Invalid Department or Designation Group.", null);
                }

                _context.Employee.Add(employee);
                await _context.SaveChangesAsync();

                //employee.Department.DepartmentName = dept.DepartmentName;
                //employee.Designation.DesignationName = desig.DesignationName;

                return (0, "", employee);
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

            //if(!_context.Department.Any(x => x.Id == employee.DepartmentId))
            var dept = await _context.Department.FindAsync(employee.DepartmentId);
            if (dept is null)
            {
                return (400, "Invalid Department Code.", null);
            }
            //if(!_context.Designation.Any(x => x.Id == employee.DesignationId))
            var desig = await _context.Designation.FindAsync(employee.DesignationId);
            if (desig is null)
            {
                return (400, "Invalid Designation Code.", null);
            }
            if (!_context.ManageDesig.Any(x => x.DesignationId == employee.DesignationId && x.DepartmentId == employee.DepartmentId))
            {
                return (400, "Invalid Department or Designation Group.", null);
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
