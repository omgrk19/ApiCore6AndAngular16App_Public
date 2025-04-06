using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using DataModels.DataUtilities;
using DataModels.Auth;
using Services.Services.Interfaces;

namespace WebApiCore6CustomAuth.AuthControllers
{
    [Authorize(Roles = "Admin-Role")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthManageFormActionController : ControllerBase
    {        

        private readonly IAuthFormMasActionService _service;
        public AuthManageFormActionController(IAuthFormMasActionService service)
        {
            
            _service = service;
        }

        // GET: api/auth_form_mas
        //[Authorize(Roles = "Admin")]        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<auth_form_mas_action_get>>> GetData([FromQuery] auth_form_mas_action_filter filter)
        {

            try
            {
                var data = await _service.GetList(filter);

                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);

                return data.Item3;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            
        }
        
    }
}

