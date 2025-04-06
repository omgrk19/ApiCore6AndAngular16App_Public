using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using DataModels.DataUtilities;
using DataModels.Models;
using DataModels.Models;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class DepartmentRepo : IDepartmentRepo
    {
        private readonly AppDbContext _context;
        public DepartmentRepo(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<(int, string, Department)> GetById(int id)
        {
            try
            {

                var Department = await _context.Department.FindAsync(id);
                return (0, "", Department);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, List<Department>)> GetList(Department_Filter filter)
        {
            try
            {

                if (_context.Department == null)
                {
                    return (404, "NotFound()", new List<Department>());
                }

                filter.DepartmentName = filter.DepartmentName == null ? "" : filter.DepartmentName;
                filter.Id = filter.Id == null ? 0 : filter.Id;
                var data = from x in _context.Department
                           where (filter.Id > 0 ? x.Id == filter.Id : true)
                           && (filter.DepartmentName != "" ? x.DepartmentName == filter.DepartmentName : true)
                           orderby x.Id descending
                           select x;
                var dataList = await data.ToListAsync();

                return (0, "", dataList);


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, Department)> Add(Department Department)
        {
            try
            {

                if (_context.Department == null)
                {
                    //return Problem("Entity set 'AppDbContext.Department'  is null.");
                    return (404, "Entity set 'AppDbContext.Department'  is null.", Department);
                }

                _context.Department.Add(Department);
                await _context.SaveChangesAsync();


                return (0, "", Department);
            }
            catch(Exception ex) 
            {
                if (ex.InnerException.Message.Contains("UNIQUE KEY"))
                    return (409, "Duplicate entry is not allowed", null);
                throw;
            }
        }

        public async Task<(int, string, Department)> Update(int id, Department Department)
        {

            if (id != Department.Id)
            {
                return (400, "Invalid request", Department);
            }

            _context.Entry(Department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UNIQUE KEY"))
                    return (409, "Duplicate entry is not allowed", null);
                throw ex;
            }
            //catch (DbUpdateConcurrencyException ex)
            //{
            //    if (!DepartmentExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        //throw;
            //        return BadRequest("Duplicate entry is not allowed. \n" + ex.Message);
            //    }
            //}
            return (0, "", Department);
        }


        public async Task<(int, string)> Delete(int id)
        {


            if (_context.Department == null)
            {
                return (404, "Data not found");
            }

            var Department = await _context.Department.FindAsync(id);
            if (Department == null)
            {
                return (404, "Data not found");
            }

            if (await _context.ManageDesig.AnyAsync(x => x.DepartmentId == id))
            {
                //return BadRequest("You cannot delete this record, it is using in further process.");
                return (400, "You cannot delete this record, it is using in further process.");
            }

            _context.Department.Remove(Department);
            await _context.SaveChangesAsync();

            return (0, "");
        }

       
        private bool DepartmentExists(int id)
        {
            return (_context.Department?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
