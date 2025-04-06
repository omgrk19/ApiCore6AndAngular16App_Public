using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using DataModels.Auth;
using DataModels.DataUtilities;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepo _repo;

        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;        
        CheckAuthorizeUpdates checkAuthorizeUpdates;
        ClaimsPrincipal User;
        public AccountService(IAccountRepo repo, AppDbContext context, IConfiguration configuration)
        {
            _repo = repo;
            this._context = context;
            this._configuration = configuration;            
            checkAuthorizeUpdates = new CheckAuthorizeUpdates(_context);            
        }

        public async Task<auth_user> Login(AccountLoginViewModel model)
        {
            var user = await _repo.Login(model);
            return user;
        }

        public async Task<JwtSecurityToken> MultiFuntion(auth_user? user)
        {
            try
            {
                //Check Authoriztion Updates
                await checkAuthorizeUpdates.CheckEntry();

                var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.username),
                        new Claim(ClaimTypes.Email, user.email),
                        new Claim(ClaimTypes.NameIdentifier, user.userid),
                        //new Claim(ClaimTypes.Sid, user.profileid),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                //Adding Admin-Role
                if (user.profileid == "Admin")
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, "Admin-Role"));
                }

                var user_auth = await AuthProfileFormAction(user.profileid);
                if (user_auth != null)
                {
                    foreach (var item in user_auth)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, $"{item.FormId}-{item.ActionId}"));
                    }
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                return token;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string)> ManagingUserProfile(auth_user user2, List<auth_profile_form_action> usedProfileOfRoles)
        {
            return await _repo.ManagingUserProfile(user2, usedProfileOfRoles);
        }

        public async Task<List<auth_profile_form_action>> AuthProfileFormAction(string profileid)
        {
            return await _repo.AuthProfileFormAction(profileid);
        }

        public async Task<bool> IsDuplicateEmail(string Email)
        {
            return await _repo.IsDuplicateEmail(Email);
        }
        public async Task<auth_user> CreatingNewUser(AccountRegisterViewModel model)
        {
            return await _repo.CreatingNewUser(model);
        }

        public async Task<(int, string, string)> UpdateUserPhotoData(UserFileUpdate u, string signedin_userid)
        {
            try
            {
                if (signedin_userid != null)
                {
                    //var user = await (from x in _context.auth_user
                    //                  where x.userid == signedin_userid
                    //                  select x).FirstOrDefaultAsync();

                    var user = await _repo.GetUserByUserId(signedin_userid);

                    if (u.FilePath != null && user != null)
                    {
                        await _repo.UpdateFilePath(u, user);
                        //return Ok(new { PhotoUrl = u.FilePath });
                        return (0, "", u.FilePath);
                    }
                }
                //return BadRequest("First Login now");
                return (400, "First Login now", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, List<SelectListItem>)> UserRoles()
        {
            return await _repo.UserRoles();
        }


    }
}
