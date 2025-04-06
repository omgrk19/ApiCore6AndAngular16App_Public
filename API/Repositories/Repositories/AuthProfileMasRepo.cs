using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using DataModels.Auth;
using DataModels.DataUtilities;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class AuthProfileMasRepo : IAuthProfileMasRepo
    {
        private readonly AppDbContext _context;

        public AuthProfileMasRepo(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<(int, string, List<auth_profile_mas>)> GetList(auth_profile_mas_filter filter)
        {
            try
            {
                if (_context.auth_profile_mas == null)
                {
                    return (404, "NotFound()", null);
                }

                filter.ProfileId = filter.ProfileId == null ? "" : filter.ProfileId;
                filter.Profile_Name = filter.Profile_Name == null ? "" : filter.Profile_Name;
                filter.Id = filter.Id == null ? 0 : filter.Id;
                var data = from x in _context.auth_profile_mas
                           where (filter.Id > 0 ? x.Id == filter.Id : true)
                           && (filter.ProfileId != "" ? x.ProfileId == filter.ProfileId : true)
                           && (filter.Profile_Name != "" ? x.Profile_Name.Contains(filter.ProfileId) : true)
                           orderby x.Id descending
                           select x;

                return (0, "", await data.ToListAsync());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, auth_profile_mas)> GetById(int id)
        {
            try
            {
                if (_context.auth_profile_mas == null)
                {
                    return (404, "NotFound()", null);
                }
                var auth_profile_mas = await _context.auth_profile_mas.FindAsync(id);

                if (auth_profile_mas == null)
                {
                    return (404, "NotFound()", null);
                }

                return (0, "", auth_profile_mas);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, auth_profile_mas)> Add(auth_profile_mas Model)
        {
            try
            {
                if (_context.auth_profile_mas == null)
                {
                    //return Problem("Entity set 'AppDbContext.auth_profile_mas'  is null.");
                    return (400, "Entity set 'AppDbContext.auth_profile_mas'  is null.", Model);
                }
                _context.auth_profile_mas.Add(Model);
                await _context.SaveChangesAsync();
                return (0, "", Model);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UNIQUE KEY"))
                    return (409, "Duplicate entry is not allowed", null);
                throw;
            }
        }

        public async Task<(int, string, auth_profile_mas)> Update(int id, auth_profile_mas Model)
        {
            if (id != Model.Id)
            {
                return (0, "BadRequest()", Model);
            }
            if (Model.Id > 0 && Model.Id <= 3)
            {
                //return BadRequest("Cannot delete or modify delete primary data.");
                return (400, "Cannot delete or modify delete primary data.", Model);
            }

            _context.Entry(Model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }            
            catch (DbUpdateConcurrencyException)
            {
                if (!DataExists(id))
                {
                    return (404,"NotFound()", Model);
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UNIQUE KEY"))
                    return (409, "Duplicate entry is not allowed", null);
                throw;
            }

            return (0, "", Model);
        }

        public async Task<(int, string)> Delete(int id)
        {
            try
            {
                if (_context.auth_profile_mas == null)
                {
                    return (404, "NotFound()");
                }
                var auth_profile_mas = await _context.auth_profile_mas.FindAsync(id);
                if (auth_profile_mas == null)
                {
                    return (404, "NotFound()");
                }

                if (auth_profile_mas.Id > 0 && auth_profile_mas.Id <= 3)
                {
                    //return BadRequest("Cannot delete or modify delete primary data.");
                    return (400, "Cannot delete or modify delete primary data.");
                }

                _context.auth_profile_mas.Remove(auth_profile_mas);
                await _context.SaveChangesAsync();

                return (0, "");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private bool DataExists(int id)
        {
            return (_context.auth_profile_mas?.Any(e => e.Id == id)).GetValueOrDefault();
        }

    }
}
