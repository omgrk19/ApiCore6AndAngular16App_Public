using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;

using DataModels.Models;
using Services.Services.Interfaces;
using Services.DTOs;
using DataModels.FilterModels;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        //private readonly AppDbContext _context;
        private readonly IDepartmentService _service;

        //public DepartmentController(IDepartmentService service, IMapper mapper)
        public DepartmentController(IDepartmentService service)
        {
            //_context = context;
            _service = service;
        }

        // GET: api/Department
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "Department-List")]
        [HttpGet]
        public async Task<ActionResult<List<DepartmentDTO>>> GetDepartment([FromQuery] DepartmentFilter filter)
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

        // GET: api/Department/5
        [Authorize(Roles = "Department-View")]
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDTO>> GetDepartment(int id)
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

        // PUT: api/Department/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Department-Edit")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, DepartmentUpdateDTO Department)
        {
            try
            {
                var data = await _service.Update(id, Department);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);

                return CreatedAtAction("GetDepartment", data.Item3);                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Department
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Department-Add")]
        [HttpPost]
        public async Task<ActionResult<DepartmentDTO>> PostDepartment(DepartmentInsertDTO Department)
        {
            try
            {
                var data = await _service.Add(Department);

                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);

                //return NoContent();

                return CreatedAtAction("GetDepartment", data.Item3);
            }
            catch (Exception ex)
            {
                //return BadRequest("Duplicate entry is not allowed. <br>" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Department/5
        [Authorize(Roles = "Department-Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
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
