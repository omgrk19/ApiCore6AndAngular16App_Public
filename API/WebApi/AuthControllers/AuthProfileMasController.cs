using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataModels.Auth;
using DataModels.DataUtilities;
using DataModels.Models;
using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces;

namespace WebApi.AccountControllers
{
    [Authorize(Roles = "Admin-Role")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthProfileMasController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAuthProfileMasService _service;

        public AuthProfileMasController(AppDbContext context, IAuthProfileMasService service)
        {
            _context = context;
            this._service = service;
        }

        // GET: api/auth_profile_mas
        //[Authorize(Roles = "Admin")]        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<auth_profile_mas>>> GetData([FromQuery] auth_profile_mas_filter filter)
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

        // GET: api/auth_profile_mas/5
        //[Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<auth_profile_mas>> GetData(int id)
        {            

            try
            {

                var data = await _service.GetById(id);
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

        // PUT: api/auth_profile_mas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutData(int id, auth_profile_mas auth_profile_mas)
        {            

            try
            {

                var data = await _service.Update(id, auth_profile_mas);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/auth_profile_mas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles = "auth_profile_mas-Add")]
        [HttpPost]
        public async Task<ActionResult<auth_profile_mas>> PostData(auth_profile_mas auth_profile_mas)
        {            

            try
            {

                var data = await _service.Add(auth_profile_mas);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);

                return CreatedAtAction("GetData", new { id = data.Item3.Id }, data.Item3);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/auth_profile_mas/5
        //[Authorize(Roles = "auth_profile_mas-Delete")]
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
