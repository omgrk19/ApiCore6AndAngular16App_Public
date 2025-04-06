using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataModels.Auth;
using DataModels.DataUtilities;
using DataModels.Auth;
using Services.Services.Interfaces;

namespace WebApiCore6CustomAuth.AuthControllers
{
    [Authorize(Roles = "Admin-Role")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthManageUserProfileFormActionController : ControllerBase
    {
        
        private readonly IAuthUserProfileActionService _service;

        public AuthManageUserProfileFormActionController(IAuthUserProfileActionService service)
        {        
            _service = service;
        }

        // GET: api/auth_form_mas
        //[Authorize(Roles = "Admin")]        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<auth_user_profile_action_get>>> GetData([FromQuery] auth_user_profile_action_filter filter)
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



        // POST: api/auth_form_mas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles = "auth_form_mas-Add")]
        [HttpPost]
        public async Task<ActionResult<auth_form_mas>> PostData(auth_user_profile_action model)
        {
            

            try
            {

                var data = await _service.Add(model);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);



                return CreatedAtAction("GetData", new { id = data.Item3.FormId }, data.Item3);
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

            var data = await _service.Delete(id);
            if (data.Item1 == 400)
                return BadRequest(data.Item2);
            else if (data.Item1 == 404)
                return NotFound(data.Item2);

            return NoContent();
        }

    }
}

