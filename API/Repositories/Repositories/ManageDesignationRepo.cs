using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;
using DataModels.Models;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class ManageDesignationRepo : IManageDesignationRepo
    {
        private readonly AppDbContext _context;

        public ManageDesignationRepo(AppDbContext context)
        {
            _context = context;
        }
        public async Task<(int, string, List<ManageDesignation_Get>)> GetList(ManageDesignation_Filter filter)
        {
            try
            {
                if (_context.auth_form_mas == null)
                {
                    return (404, "NotFound()", null);
                }

                filter.Id = filter.Id == null ? 0 : filter.Id.Value;
                filter.DesignationId = filter.DesignationId == null ? 0 : filter.DesignationId.Value;
                filter.DepartmentId = filter.DepartmentId == null ? 0 : filter.DepartmentId.Value;

                var data = from x in _context.ManageDesig
                           join d in _context.Department on x.DepartmentId equals d.Id
                           join g in _context.Designation on x.DesignationId equals g.Id
                           where (filter.Id != 0 ? x.DepartmentId == filter.DepartmentId : true)
                           && (filter.DepartmentId != 0 ? x.DepartmentId == filter.DepartmentId : true)
                           && (filter.DesignationId != 0 ? x.DesignationId == filter.DesignationId : true)
                           orderby d.DepartmentName ascending, g.DesignationName ascending
                           select (new ManageDesignation_Get
                           {
                               Id = x.Id,
                               DesignationId = x.DesignationId,
                               DepartmentId = x.DepartmentId,
                               DepartmentName = d.DepartmentName,
                               DesignationName = g.DesignationName
                           });
                return (0, "", await data.ToListAsync());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<(int, string, ManageDesignation)> Add(ManageDesignation Model)
        {
            try
            {
                if (_context.ManageDesig == null)
                {
                    //return BadRequest("Entity set 'AppDbContext.auth_form_mas'  is null.");
                    return (400, "Entity set 'AppDbContext.auth_form_mas'  is null.", Model);
                }
                if (!_context.Department.Any(x => x.Id == Model.DepartmentId))
                {
                    //return BadRequest("Invalid department.");
                    return (400, "Invalid department.", Model);
                }
                if (!_context.Designation.Any(x => x.Id == Model.DesignationId))
                {
                    //return BadRequest("Invalid designation.");
                    return (400, "Invalid designation.", Model);
                }

                if (_context.ManageDesig.Any(x => x.DepartmentId == Model.DepartmentId
                && x.DesignationId == Model.DesignationId))
                {
                    //return Conflict("Duplicate entry is not allowed.");
                    return (409, "Duplicate entry is not allowed.", Model);
                }

                _context.ManageDesig.Add(Model);
                await _context.SaveChangesAsync();

                return (0, "", Model);
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
                if (_context.auth_form_mas == null)
                {
                    return (404, "NotFound()");
                }
                var data = await _context.ManageDesig.FindAsync(id);
                if (data == null)
                {
                    return (404, "NotFound()");
                }

                if (await _context.Employee.AnyAsync(x => x.DepartmentId == data.DepartmentId
                && x.DesignationId == data.DesignationId))
                {
                    //return BadRequest("You cannot delete this record, it is using in further process.");
                    return (400, "You cannot delete this record, it is using in further process.");
                }

                _context.ManageDesig.Remove(data);
                await _context.SaveChangesAsync();
                return (0, "");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
