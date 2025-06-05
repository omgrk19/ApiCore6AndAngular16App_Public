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
using DataModels.FilterModels;
using Services.DTOs;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly IDesignationService _service;
        public DesignationController(IDesignationService service)
        {
            
            _service = service;
        }

        // GET: api/Designation
        //[Authorize(Roles = "Admin,User")]
        [Authorize(Roles = "Designation-List")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DesignationDTO>>> GetDesignation_Master([FromQuery] DesignationFilter filter)
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
                //return BadRequest(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Designation/5
        [Authorize(Roles = "Designation-View")]
        [HttpGet("{id}")]
        public async Task<ActionResult<DesignationDTO>> GetDesignation_Master(int id)
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

        // PUT: api/Designation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Designation-Edit")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesignation_Master(int id, DesignationUpdateDTO designation_Master)
        {
            try
            {

                var data = await _service.Update(id, designation_Master);

                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);


                return CreatedAtAction("GetDesignation_Master", data.Item3);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Designation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Designation-Add")]
        [HttpPost]
        public async Task<ActionResult<Designation>> PostDesignation_Master(DesignationInsertDTO designation)
        {
            try
            {

                var data = await _service.Add(designation);
                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);
                else if (data.Item1 == 409)
                    return Conflict(data.Item2);


                return CreatedAtAction("GetDesignation_Master", data.Item3);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Designation/5        
        [Authorize(Roles = "Designation-Delete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesignation_Master(int id)
        {
            try
            {

                var data = await _service.Delete(id);

                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return BadRequest(data.Item2);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
