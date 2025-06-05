using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using DataModels.Auth;
using DataModels.DataUtilities;
using DataModels.Auth;
using Services.Services;
using Services.Services.Interfaces;

namespace WebApiCore6CustomAuth.AuthControllers
{
    [Authorize(Roles = "Admin-Role")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthManageProfileFormActionController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAuthProfileFormActionService _service;

        public AuthManageProfileFormActionController(AppDbContext context, IAuthProfileFormActionService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/auth_form_mas
        //[Authorize(Roles = "Admin")]        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<auth_profile_form_action_get>>> GetData([FromQuery] auth_profile_form_action_filter filter)
        {

            var data = await _service.GetList(filter);

            if (data.Item1 == 400)
                return BadRequest(data.Item2);
            else if (data.Item1 == 404)
                return NotFound(data.Item2);

            return data.Item3;

            
        }



        // POST: api/auth_form_mas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles = "auth_form_mas-Add")]
        [HttpPost]
        public async Task<ActionResult<auth_form_mas>> PostData(auth_profile_form_action data_)
        {
            

            try
            {

                var data = await _service.Add(data_);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);


                return CreatedAtAction("GetData", data.Item3);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/auth_form_mas/5
        //[Authorize(Roles = "auth_form_mas-Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteData(int id)
        {

            try
            {
                var data = await _service.Delete(id);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
    }
}

