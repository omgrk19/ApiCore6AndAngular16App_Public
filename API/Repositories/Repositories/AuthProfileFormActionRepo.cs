using Microsoft.EntityFrameworkCore;
using DataModels.Auth;
using DataModels.DataUtilities;

using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class AuthProfileFormActionRepo : IAuthProfileFormActionRepo
    {
        private readonly AppDbContext _context;

        public AuthProfileFormActionRepo(AppDbContext context)
        {
            _context = context;
        }



        public async Task<(int, string, List<auth_profile_form_action_get>)> GetList(auth_profile_form_action_filter filter)
        {
            try
            {

                if (_context.auth_profile_form_action == null)
                {
                    return (404, "NotFound()", null);
                }

                filter.ProfileId = filter.ProfileId == null ? "" : filter.ProfileId;
                filter.FormId = filter.FormId == null ? "" : filter.FormId;
                filter.FormName = filter.FormName == null ? "" : filter.FormName;
                filter.ProfileName = filter.ProfileName == null ? "" : filter.ProfileName;
                filter.ActionId = filter.ActionId == null ? "" : filter.ActionId;

                var data = from x in _context.auth_profile_form_action
                           join y in _context.auth_form_mas on x.FormId equals y.formid
                           join p in _context.auth_profile_mas on x.ProfileId equals p.ProfileId
                           where (filter.FormId != "" ? x.FormId == filter.FormId : true)
                           && (filter.FormName != "" ? y.form_name.Contains(filter.FormName) : true)
                           && (filter.ProfileName != "" ? p.Profile_Name.Contains(filter.ProfileName) : true)
                           && (filter.ActionId != "" ? x.ActionId == filter.ActionId : true)
                           && (filter.ProfileId != "" ? x.ProfileId == filter.ProfileId : true)
                           orderby x.ProfileId ascending, x.FormId ascending, x.ActionId ascending
                           select (new auth_profile_form_action_get
                           {
                               Id = x.Id,
                               FormId = x.FormId,
                               ActionId = x.ActionId,
                               FormName = y.form_name,
                               ProfileId = x.ProfileId,
                               ProfileName = p.Profile_Name,
                           });

                return (0, "", await data.ToListAsync());

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, auth_profile_form_action_get)> Add(auth_profile_form_action data)
        {
            
            auth_profile_form_action_get data2 = new auth_profile_form_action_get()
            {
                ActionId = data.ActionId,
                FormId = data.FormId,
                ProfileId = data.ProfileId,
                Id = data.Id
            };
            
            try
            {
                if (_context.auth_profile_form_action == null)
                {
                    //return BadRequest("Entity set 'AppDbContext.auth_form_mas'  is null.");
                    return (400, "Entity set 'AppDbContext.auth_form_mas'  is null.", data2);
                }

                if (data.ProfileId == "Admin")
                {
                    //return BadRequest("Admin profile data can not be changed. It is fixed");
                    return (400, "Admin profile data can not be changed. It is fixed", data2);
                }

                //if (!_context.auth_form_mas.Any(x => x.formid == data.FormId))
                var form = _context.auth_form_mas.FirstOrDefault(x => x.formid == data.FormId);
                if (form is null)
                {
                    //return BadRequest("Invalid form.");
                    return (400, "Invalid form.", data2);
                }
                //if (!_context.auth_action.Any(x => x.action == data.ActionId))
                var action = _context.auth_action.FirstOrDefault(x => x.action == data.ActionId);
                if (action is null)
                {
                    //return BadRequest("Invalid action.");
                    return (400, "Invalid action.", data2);
                }
                //if (!_context.auth_profile_mas.Any(x => x.ProfileId == data.ProfileId))
                var profile = _context.auth_profile_mas.FirstOrDefault(x => x.ProfileId == data.ProfileId);
                if (profile is null)
                {
                    //return BadRequest("Invalid profile.");
                    return (400, "Invalid profile.", data2);
                }
                if (_context.auth_profile_form_action.Any(x => x.ProfileId == data.ProfileId
                && x.FormId == data.FormId && x.ActionId == data.ActionId))
                {
                    //return Conflict("Duplicate entry is not allowed.");
                    return (409, "Duplicate entry is not allowed.", null);
                }

                _context.auth_profile_form_action.Add(data);
                await _context.SaveChangesAsync();

                data2.Id = data.Id;
                data2.FormName = form.form_name;
                data2.ProfileName = profile.Profile_Name;

                return (0, "", data2);
            }
            catch(Exception ex)
            {
                if (ex.InnerException.Message.Contains("UNIQUE KEY"))
                    return (409, "Duplicate entry is not allowed", null);
                throw;
            }
        }

        public async Task<(int, string)> Delete(int id)
        {
            if (_context.auth_form_mas == null)
            {
                return (404, "NotFound()");
            }
            var data = await _context.auth_profile_form_action.FindAsync(id);
            if (data == null)
            {
                return (404, "NotFound()");
            }

            if (data.ProfileId == "Admin")
            {
                //return BadRequest("Admin profile can not be deleted.");
                return (400, "Admin profile can not be deleted.");
            }

            _context.auth_profile_form_action.Remove(data);
            await _context.SaveChangesAsync();

            return (0, "");
        }

        private bool DataExists(int id)
        {
            return (_context.auth_profile_form_action?.Any(e => e.Id == id)).GetValueOrDefault();
        }


    }
}
