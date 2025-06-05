using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using DataModels.Auth;
using DataModels.DataUtilities;
using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces;

namespace WebApiCore6CustomAuth.AuthControllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ManageDesignationController : ControllerBase
    {        
        private readonly IManageDesignationService _service;
        public ManageDesignationController(AppDbContext context, IManageDesignationService service)
        {
            this._service = service;
        }

        // GET: api/auth_form_mas
        [Authorize(Roles = "ManageDesignation-List")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ManageDesignation_Get>>> GetData([FromQuery] ManageDesignation_Filter filter)
        {
            //if (_context.auth_form_mas == null)
            //{
            //    return NotFound();
            //}

            //filter.Id = filter.Id == null ? 0 : filter.Id.Value;
            //filter.DesignationId = filter.DesignationId == null ? 0 : filter.DesignationId.Value;
            //filter.DepartmentId = filter.DepartmentId == null ? 0 : filter.DepartmentId.Value;            

            //var data = from x in _context.ManageDesig
            //           join d in _context.Department on x.DepartmentId equals d.Id
            //           join g in _context.Designation on x.DesignationId equals g.Id
            //           where (filter.Id != 0 ? x.DepartmentId == filter.DepartmentId : true)                       
            //           && (filter.DepartmentId != 0 ? x.DepartmentId == filter.DepartmentId : true)                       
            //           && (filter.DesignationId != 0 ? x.DesignationId == filter.DesignationId : true)                       
            //           orderby d.DepartmentName ascending, g.DesignationName ascending
            //           select (new ManageDesignation_Get
            //           {
            //               Id = x.Id,
            //               DesignationId = x.DesignationId,
            //               DepartmentId = x.DepartmentId,
            //               DepartmentName = d.DepartmentName,
            //               DesignationName = g.DesignationName
            //           });
            //return await data.ToListAsync();

            try
            {
                var data = await _service.GetList(filter);

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



        // POST: api/auth_form_mas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "ManageDesignation-Add")]
        [HttpPost]
        public async Task<ActionResult<auth_form_mas>> PostData(ManageDesignation data_)
        {
            //if (_context.ManageDesig == null)
            //{
            //    return BadRequest("Entity set 'AppDbContext.auth_form_mas'  is null.");
            //}
            //if (!_context.Department.Any(x => x.Id == data.DepartmentId))
            //{
            //    return BadRequest("Invalid department.");
            //}
            //if (!_context.Designation.Any(x => x.Id == data.DesignationId))
            //{
            //    return BadRequest("Invalid designation.");
            //}

            //if (_context.ManageDesig.Any(x => x.DepartmentId == data.DepartmentId
            //&& x.DesignationId == data.DesignationId))
            //{
            //    return Conflict("Duplicate entry is not allowed.");
            //}

            //_context.ManageDesig.Add(data);
            //await _context.SaveChangesAsync();
            //return CreatedAtAction("GetData", new { id = data.Id }, data);

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
        [Authorize(Roles = "ManageDesignation-Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteData(int id)
        {

            //if (_context.auth_form_mas == null)
            //{
            //    return NotFound();
            //}
            //var data = await _context.ManageDesig.FindAsync(id);
            //if (data == null)
            //{
            //    return NotFound();
            //}

            //if (await _context.Employee.AnyAsync(x => x.DepartmentId == data.DepartmentId
            //&& x.DesignationId == data.DesignationId))
            //{
            //    return BadRequest("You cannot delete this record, it is using in further process.");
            //}

            //_context.ManageDesig.Remove(data);
            //await _context.SaveChangesAsync();
            // return NoContent();

            var data = await _service.Delete(id);
            if (data.Item1 == 400)
                return BadRequest(data.Item2);
            else if (data.Item1 == 404)
                return NotFound(data.Item2);

            return NoContent();
        }

        //private bool DataExists(int id)
        //{
        //    return (_context.ManageDesig?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}

