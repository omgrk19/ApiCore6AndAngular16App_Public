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
    public class DesignationRepo : IDesignationRepo
    {
        private readonly AppDbContext _context;
        public DesignationRepo(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<(int, string, Designation)> GetById(int id)
        {
            try
            {


                if (_context.Designation == null)
                {
                    return (404, "No data found", null);
                }
                var designation = await _context.Designation.FindAsync(id);

                if (designation == null)
                {
                    return (404, "No data found", null);
                }

                return (0, "", designation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, List<Designation>)> GetList(Designation_Filter filter)
        {
            try
            {


                if (_context.Designation == null)
                {
                    return (404, "NotFound()", new List<Designation>());
                }

                filter.DesignationName = filter.DesignationName == null ? "" : filter.DesignationName;
                filter.Id = filter.DesignationName == null ? 0 : filter.Id;

                var data = from x in _context.Designation
                           where (filter.Id > 0 ? x.Id == filter.Id : (true))
                           && (filter.DesignationName != "" ? x.DesignationName.Contains(filter.DesignationName) : (true))
                           orderby x.Id descending
                           select x;
                return (0, "", await data.ToListAsync());

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, Designation)> Add(Designation Designation)
        {
            try
            {

                if (_context.Designation == null)
                {
                    //return Problem("Entity set 'AppDbContext.Department'  is null.");
                    return (500, "Entity set 'AppDbContext.Department'  is null.", Designation);
                }

                _context.Designation.Add(Designation);
                await _context.SaveChangesAsync();


                return (0, "", Designation);
            }
            catch(Exception ex)
            {
                if (ex.InnerException.Message.Contains("UNIQUE KEY"))
                    return (409, "Duplicate entry is not allowed", null);
                throw;
            }
        }
       
        public async Task<(int, string, Designation)> Update(int id, Designation Designation)
        {

            if (id != Designation.Id)
            {
                return (400, "Invalid request", null);
            }

            _context.Entry(Designation).State = EntityState.Modified;

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
            //    if (!DesignationExists(id))
            //    {
            //        return (404, "notfound()", null);
            //    }
            //    else
            //    {
            //        //throw ex;
            //        return (404, "duplicate entry is not allowed. \n" + ex.Message, null);
            //    }
            //}

            return (0, "", Designation);
        }

        public async Task<(int, string)> Delete(int id)
        {


            if (_context.Designation == null)
            {
                return (404, "data not found");
            }

            var Designation = await _context.Designation.FindAsync(id);
            if (Designation == null)
            {
                return (404, "Data not found");
            }

            if (await _context.ManageDesig.AnyAsync(x => x.DesignationId == id))
            {
                return (400, "You cannot delete this record, it is using in further process.");
            }

            _context.Designation.Remove(Designation);
            await _context.SaveChangesAsync();

            return (0, "");
        }


        private bool DesignationExists(int id)
        {
            return (_context.Designation?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
