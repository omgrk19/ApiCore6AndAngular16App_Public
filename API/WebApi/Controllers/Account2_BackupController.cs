using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.DataUtilities;
using WebApi.Models;
using WebApi.Auth;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data;
using WebApiCore6CustomAuth.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Account2_BackupController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        CheckAuthorizeUpdates checkAuthorizeUpdates;

        public Account2_BackupController(
            IConfiguration configuration,
            AppDbContext dbContext)

        {
            this._configuration = configuration;
            this._context = dbContext;
            checkAuthorizeUpdates = new CheckAuthorizeUpdates(_context);

        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] AccountLoginViewModel model)
        {
            try
            {
                //var user = await userManager.FindByEmailAsync(model.Email);
                var user = await _context.auth_user.Where(x => x.email == model.Email && x.passwd == model.Password).FirstOrDefaultAsync();
                if (user != null)
                {
                    JwtSecurityToken token = await MultiFuntion(user);

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        photo = user.PhotoUrl,
                        userName = user.username,
                        userProfile = user.profileid
                    });
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        private async Task<JwtSecurityToken> MultiFuntion(auth_user? user)
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

            var user_auth = await _context.auth_profile_form_action.Where(x => x.ProfileId == user.profileid).ToListAsync();
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

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] AccountRegisterViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (model.Role != "Admin" && model.Role != "User")
                {
                    return BadRequest("Invalid Role (',' Valid roles are Admin or User)");
                }

                bool duplicateStatus = await _context.auth_user.AnyAsync(x => x.email == model.Email);
                if (duplicateStatus)
                {
                    return Ok(new { status = false, msg = "This userid or email id already exists." });
                    //ModelState.AddModelError("Exists","This userid or email id already exists");
                    //return BadRequest(ModelState);
                }

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

                var usedProfileOfRoles = await (from x in _context.auth_profile_form_action
                                                where x.ProfileId == user2.profileid
                                                select x).ToListAsync();

                if (usedProfileOfRoles.Count > 0)
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
                }

                if (user2.userid != null && !model.LoginStatus)
                {
                    //await signInManager.SignInAsync(user2, isPersistent: false);
                    return Ok(new { status = true, msg = "Registration process completed successfully." });
                }


                if (user2.userid != null && model.LoginStatus)
                {

                    JwtSecurityToken token = await MultiFuntion(user2);

                    return Ok(new
                    {
                        status = true,
                        msg = "Registration process completed successfully.",
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,                        
                        userName = user2.username,
                        userProfile = user2.profileid
                    });

                }

                return Unauthorized();

            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }


        [HttpGet]
        [Route("RoleProfile")]
        public async Task<IActionResult> UserRoles()
        {
            var usedProfileOfRoles = await (from x in _context.auth_profile_form_action
                                            select x.ProfileId).Distinct().ToListAsync();

            var roles = from x in _context.auth_profile_mas
                        where usedProfileOfRoles.Contains(x.ProfileId)
                        select (new SelectListItem { Text = x.Profile_Name, Value = x.ProfileId });
            return Ok(await roles.ToListAsync());
        }


        [HttpPut]
        [Route("UpdatePhotoData")]
        public async Task<IActionResult> UpdateUserPhotoData([FromBody] UserFileUpdate u)
        {
            try
            {
                string userid = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userid != null)
                {
                    var user = await (from x in _context.auth_user
                                      where x.userid == userid
                                      select x).FirstOrDefaultAsync();

                    if (u.FilePath != null && user != null)
                    {
                        user.PhotoUrl = u.FilePath;
                        _context.auth_user.Update(user);
                        await _context.SaveChangesAsync();
                        return Ok(new { PhotoUrl = u.FilePath });
                    }
                    return BadRequest();
                }
                return BadRequest("First Login now");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
