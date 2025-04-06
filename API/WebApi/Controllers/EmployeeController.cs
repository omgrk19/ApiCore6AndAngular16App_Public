using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;
using DataModels.Models;
using Services.Services.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmployeeService _service;

        public EmployeeController(AppDbContext context, IEmployeeService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Employee
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "Employee-List")]
        [HttpGet]
        public async Task<ActionResult<usp_EmployeeDetails_Vm>> GetEmployee([FromQuery] usp_EmployeeDetails_filter filter)
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


        // GET: api/Employee/5
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "Employee-View")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
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

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles = "Admin")]
        [Authorize(Roles = "Employee-Edit")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee Employee)
        {
            try
            {
                var data = await _service.Update(id, Employee);

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
            //return Ok("Success fully updated");
        }

        // PUT: api/Employee/Update User File/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "Employee-Upload")]
        [HttpPut("UpdateFile/{id}")]
        public async Task<IActionResult> PutEmployeeFiles(int id, [FromBody] UserFileUpdate u)
        {
            try
            {
                var data = await _service.UpdateEmployeFile(id, u);

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

        // POST: api/Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "Employee-Add")]
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee Employee)
        {
            try
            {


                var data = await _service.Add(Employee);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);

                return CreatedAtAction("GetEmployee", new { id = data.Item3.UserId }, data.Item3);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Employee/5
        //[Authorize(Roles = "Admin")]
        [Authorize(Roles = "Employee-Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
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
