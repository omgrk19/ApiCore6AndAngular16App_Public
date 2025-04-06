using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DataUtilities;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class loginController : ControllerBase
    {

        private readonly AppDbContext _context;

        public loginController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsersDetail>> PostLogin(Login login)
        {
            UsersDetail usersDetail = new UsersDetail();
            try
            {

                if (login == null)
                {
                    return NotFound("Not filled data or invalid request");
                }
                if (_context.Users == null)
                {
                    return Problem("Entity set 'AppDbContext.Users'  is null.");
                }
                //Users data = await _context.Users.Where(x => x.EmailId == login.EmailId && x.Password == login.Password).FirstOrDefaultAsync();
                var data = await (from x in _context.Users
                                  join y in _context.Designation_Master
                             on x.DesignationId equals y.DesignationId
                             into ys
                                  from y in ys.DefaultIfEmpty()
                                  where x.EmailId == login.EmailId && x.Password == login.Password
                                  select new UsersDetailDb
                                  {
                                      EmailId = x.EmailId,
                                      Password = x.Password,
                                      FirstName = x.FirstName,
                                      LastName = x.LastName,
                                      BirthDate = x.BirthDate,
                                      DesignationId = x.DesignationId,
                                      DesignationName = y.DesignationName,
                                  }).FirstOrDefaultAsync();
                if (data == null)
                    return NotFound("Invalid Username or password");
                //case sensitive
                if (data.EmailId != login.EmailId || data.Password != login.Password)
                    return NotFound("Invalid Username or password");

                usersDetail = new UsersDetail
                {
                    EmailId = data.EmailId,
                    Designation = data.DesignationName,
                    FirstName = data.FirstName,
                    LastName = data.LastName,
                    UserName = data.EmailId,                     
                };

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(usersDetail);
        }
    }
}
