using DataModels.Auth;
using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using DataModels.DataUtilities;
using DataModels.Models;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class AccountRepo : IAccountRepo
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        CheckAuthorizeUpdates checkAuthorizeUpdates;

        public AccountRepo(AppDbContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
            checkAuthorizeUpdates = new CheckAuthorizeUpdates(_context);
        }
        public async Task<auth_user> Login(AccountLoginViewModel model)
        {
            try
            {
                var user = await _context.auth_user.Where(x => x.email == model.Email && x.passwd == model.Password).FirstOrDefaultAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<auth_user> GetUserByUserId(string UserId)
        {
            try
            {
                var user = await _context.auth_user.Where(x => x.userid == UserId).FirstOrDefaultAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateFilePath(UserFileUpdate u, auth_user user)
        {
            user.PhotoUrl = u.FilePath;
            _context.auth_user.Update(user);
            await _context.SaveChangesAsync();
        }


        public async Task<auth_user> CreatingNewUser(AccountRegisterViewModel model)
        {
            var user2 = new auth_user
            {
                email = model.Email,
                username = model.Email,
                passwd = model.Password,
                user_type = model.Role,
                Com_Code = "admin",
                name = "",
                profileid = model.Role,
                st = true,
                login_status = false,
            };

            string sql = "select * from auth_user where convert(numeric(18),substring(userid,5,10)) = (select max(convert(numeric(18),substring(userid,5,10))) from auth_user)";
            var udata = await _context.auth_user.FromSqlRaw(sql).FirstOrDefaultAsync();
            if (udata == null)
                user2.userid = "USER1";
            else
                user2.userid = $"USER{(Convert.ToInt32(udata.userid.Substring(4, udata.userid.Length - 4)) + 1)}";

            await _context.auth_user.AddAsync(user2);
            await _context.SaveChangesAsync();

            return user2;
        }

        public async Task<List<auth_profile_form_action>> AuthProfileFormAction(string profileid)
        {
            try
            {
                var user_auth = await _context.auth_profile_form_action.Where(x => x.ProfileId == profileid).ToListAsync();

                return user_auth;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public async Task<(int, string)> ManagingUserProfile(auth_user user2, List<auth_profile_form_action> usedProfileOfRoles)
        {
            try
            {
                List<auth_user_profile_action> list = new List<auth_user_profile_action>();
                foreach (var item in usedProfileOfRoles)
                {
                    list.Add(new auth_user_profile_action
                    {
                        UserId = user2.userid,
                        ProfileId = item.ProfileId,
                        FormId = item.FormId,
                        ActionId = item.ActionId,
                        Id = 0,
                    });
                }

                //removing old roles record
                var old_records = await _context.auth_user_profile_action.Where(x => x.UserId == user2.userid).ToListAsync();
                _context.auth_user_profile_action.RemoveRange(old_records);
                await _context.SaveChangesAsync();

                //adding rols of record
                await _context.auth_user_profile_action.AddRangeAsync(list);
                await _context.SaveChangesAsync();
                //IdentityResult roleresult = await userManager.AddToRoleAsync(user, model.Role);
                return (0, "");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, List<SelectListItem>)> UserRoles()
        {
            var usedProfileOfRoles = await (from x in _context.auth_profile_form_action
                                            select x.ProfileId).Distinct().ToListAsync();

            var roles = from x in _context.auth_profile_mas
                        where usedProfileOfRoles.Contains(x.ProfileId)
                        select (new SelectListItem { Text = x.Profile_Name, Value = x.ProfileId });
            return (0, "", await roles.ToListAsync());
        }

        public async Task<bool> IsDuplicateEmail(string Email)
        {
            bool duplicateStatus = await _context.auth_user.AnyAsync(x => x.email == Email);
            return duplicateStatus;
        }

        

    }
}
