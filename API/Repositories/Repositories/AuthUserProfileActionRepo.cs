using Microsoft.EntityFrameworkCore;
using DataModels.Auth;
using DataModels.DataUtilities;
using DataModels.Auth;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class AuthUserProfileActionRepo : IAuthUserProfileActionRepo
    {
        private readonly AppDbContext _context;

        public AuthUserProfileActionRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(int, string, List<auth_user_profile_action_get>)> GetList(auth_user_profile_action_filter filter)
        {
            try
            {
                if (_context.auth_form_mas == null)
                {
                    return (404, "NotFound()", null);
                }

                filter.ProfileId = filter.ProfileId == null ? "" : filter.ProfileId;
                filter.FormId = filter.FormId == null ? "" : filter.FormId;
                filter.ActionId = filter.ActionId == null ? "" : filter.ActionId;
                filter.UserId = filter.UserId == null ? "" : filter.UserId;
                filter.FormName = filter.FormName == null ? "" : filter.FormName;
                filter.ProfileName = filter.ProfileName == null ? "" : filter.ProfileName;


                var data = from x in _context.auth_user_profile_action
                           join y in _context.auth_form_mas on x.FormId equals y.formid
                           join p in _context.auth_profile_mas on x.ProfileId equals p.ProfileId
                           join u in _context.auth_user on x.UserId equals u.userid
                           where (filter.FormId != "" ? x.FormId == filter.FormId : true)
                           && (filter.FormName != "" ? y.form_name.Contains(filter.FormName) : true)
                           && (filter.ProfileName != "" ? p.Profile_Name.Contains(filter.ProfileName) : true)
                           && (filter.ActionId != "" ? x.ActionId == filter.ActionId : true)
                           && (filter.ProfileId != "" ? x.ProfileId == filter.ProfileId : true)
                           && (filter.UserId != "" ? x.UserId == filter.UserId : true)
                           orderby x.UserId ascending, x.ProfileId ascending, x.FormId ascending, x.ActionId ascending
                           select (new auth_user_profile_action_get
                           {
                               Id = x.Id,
                               FormId = x.FormId,
                               ActionId = x.ActionId,
                               FormName = y.form_name,
                               ProfileId = x.ProfileId,
                               ProfileName = p.Profile_Name,
                               UserId = x.UserId,
                               UserName = u.username,
                               UserEmail = u.email
                           });

                return (0, "", await data.ToListAsync());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, auth_user_profile_action)> Add(auth_user_profile_action data)
        {
            try
            {
                if (_context.auth_user_profile_action == null)
                {
                    //return Problem("Entity set 'AppDbContext.auth_form_mas'  is null.");
                    return (400, "Entity set 'AppDbContext.auth_form_mas'  is null.", data);
                }

                if (!_context.auth_form_mas.Any(x => x.formid == data.FormId))
                {
                    //return Problem("Invalid form.");
                    return (400, "Invalid form.", data);
                }
                if (!_context.auth_action.Any(x => x.action == data.ActionId))
                {
                    //return Problem("Invalid action.");
                    return (400, "Invalid action.", data);
                }
                if (!_context.auth_profile_mas.Any(x => x.ProfileId == data.ProfileId))
                {
                    //return Problem("Invalid profile.");
                    return (400, "Invalid profile.", data);
                }
                if (!_context.auth_user.Any(x => x.userid == data.UserId))
                {
                    //return Problem("Invalid User.");
                    return (400, "Invalid User.", data);
                }

                _context.auth_user_profile_action.Add(data);
                await _context.SaveChangesAsync();

                return (0, "", data);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UNIQUE KEY"))
                    return (409, "Duplicate entry is not allowed", null);
                throw;
            }
        }

        public async Task<(int, string)> Delete(int id)
        {
            if (_context.auth_user_profile_action == null)
            {
                return (404, "NotFound()");
            }
            var data = await _context.auth_user_profile_action.FindAsync(id);
            if (data == null)
            {
                return (404, "NotFound()");
            }

            //if (auth_user_profile_action.Id > 0 && auth_user_profile_action.Id <= 3)
            //{
            //    return BadRequest("Cannot delete or modify delete primary data.");
            //}

            _context.auth_user_profile_action.Remove(data);
            await _context.SaveChangesAsync();

            return (0, "");
        }


    }
}
