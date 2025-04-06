using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DataModels.DataUtilities;
using DataModels.Models;
using DataModels.Auth;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data;

using Services.Services.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Account2Controller : ControllerBase
    {
        private readonly IAccountService _service;
        private readonly IConfiguration _configuration;   

        public Account2Controller(
            IConfiguration configuration            
            , IAccountService service)

        {
            this._configuration = configuration;            
            this._service = service;            
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] AccountLoginViewModel model)
        {
            try
            {
                
                //var user = await _context.auth_user.Where(x => x.email == model.Email && x.passwd == model.Password).FirstOrDefaultAsync();
                var user = await _service.Login(model);
                if (user != null)
                {
                    JwtSecurityToken token = await _service.MultiFuntion(user);

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
                return BadRequest(ex.Message);
                //throw ex;
            }
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

                bool duplicateStatus = await _service.IsDuplicateEmail(model.Email);
                if (duplicateStatus)
                {
                    return Ok(new { status = false, msg = "This userid or email id already exists." });
                    //ModelState.AddModelError("Exists","This userid or email id already exists");
                    //return BadRequest(ModelState);
                }


                #region Creating new user
                //var user2 = new auth_user
                //{
                //    email = model.Email,
                //    username = model.Email,
                //    passwd = model.Password,
                //    user_type = model.Role,
                //    Com_Code = "admin",
                //    name = "",
                //    profileid = model.Role,
                //    st = true,
                //    login_status = false,
                //};

                //string sql = "select * from auth_user where convert(numeric(18),substring(userid,5,10)) = (select max(convert(numeric(18),substring(userid,5,10))) from auth_user)";
                //var udata = await _context.auth_user.FromSqlRaw(sql).FirstOrDefaultAsync();
                //if (udata == null)
                //    user2.userid = "USER1";
                //else
                //    user2.userid = $"USER{(Convert.ToInt32(udata.userid.Substring(4, udata.userid.Length - 4)) + 1)}";

                //await _context.auth_user.AddAsync(user2);
                //await _context.SaveChangesAsync();
                #endregion
                var user2 = await _service.CreatingNewUser(model);

                //var usedProfileOfRoles = await (from x in _context.auth_profile_form_action
                //                                where x.ProfileId == user2.profileid
                //                                select x).ToListAsync();
                var usedProfileOfRoles = await _service.AuthProfileFormAction(user2.profileid);

                if (usedProfileOfRoles.Count > 0)
                {
                    await _service.ManagingUserProfile(user2, usedProfileOfRoles);
                }

                if (user2.userid != null && !model.LoginStatus)
                {
                    //await signInManager.SignInAsync(user2, isPersistent: false);
                    return Ok(new { status = true, msg = "Registration process completed successfully." });
                }


                if (user2.userid != null && model.LoginStatus)
                {

                    JwtSecurityToken token = await _service.MultiFuntion(user2);

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
            try
            {
                var data = await _service.UserRoles();

                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);

                return Ok(data.Item3);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        [Route("UpdatePhotoData")]
        public async Task<IActionResult> UpdateUserPhotoData([FromBody] UserFileUpdate u)
        {
            try
            {

                string signedin_userid = User.FindFirstValue(ClaimTypes.NameIdentifier);

                var data = await _service.UpdateUserPhotoData(u,signedin_userid);

                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);

                return Ok(new { PhotoUrl = data.Item3 });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
