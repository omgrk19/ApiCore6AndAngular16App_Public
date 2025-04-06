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
    public class AuthUserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAuthUserService _service;

        public AuthUserController(AppDbContext context, IAuthUserService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/auth_user
        //[Authorize(Roles = "Admin")]        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<auth_user_get>>> GetData()
        {

            try
            {
                var data = await _service.GetList();

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

        //// GET: api/auth_user/5
        ////[Authorize(Roles = "Admin")]
        //[HttpGet("{id}")]
        //public async Task<ActionResult<auth_user>> GetData(int id)
        //{
        //    if (_context.auth_user == null)
        //    {
        //        return NotFound();
        //    }
        //    var auth_user = await _context.auth_user.FindAsync(id);

        //    if (auth_user == null)
        //    {
        //        return NotFound();
        //    }

        //    return auth_user;
        //}

        //// PUT: api/auth_user/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        ////[Authorize(Roles = "Admin")]
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutData(int id, auth_user auth_user)
        //{
        //    if (id != auth_user.srno)
        //    {
        //        return BadRequest();
        //    }
        //    if (auth_user.srno > 0 && auth_user.srno <= 7)
        //    {
        //        return BadRequest("Cannot delete or modify delete primary data.");
        //    }

        //    _context.Entry(auth_user).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!DataExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/auth_user
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        ////[Authorize(Roles = "auth_user-Add")]
        //[HttpPost]
        //public async Task<ActionResult<auth_user>> PostData(auth_user auth_user)
        //{
        //    if (_context.auth_user == null)
        //    {
        //        return Problem("Entity set 'AppDbContext.auth_user'  is null.");
        //    }
        //    _context.auth_user.Add(auth_user);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetData", new { id = auth_user.Id }, auth_user);
        //}

        //// DELETE: api/auth_user/5
        ////[Authorize(Roles = "auth_user-Delete")]
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteData(int id)
        //{
        //    if (_context.auth_user == null)
        //    {
        //        return NotFound();
        //    }
        //    var auth_user = await _context.auth_user.FindAsync(id);
        //    if (auth_user == null)
        //    {
        //        return NotFound();
        //    }

        //    //if (auth_user.srno > 0 && auth_user.srno <= 7)
        //    //{
        //    //    return BadRequest("Cannot delete or modify delete primary data.");
        //    //}

        //    _context.auth_user.Remove(auth_user);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}
        
        private bool DataExists(int id)
        {
            return (_context.auth_user?.Any(e => e.srno == id)).GetValueOrDefault();
        }
    }
}
