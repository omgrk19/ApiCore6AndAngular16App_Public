using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;
using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces;

namespace WebApi.AccountControllers
{
    [Authorize(Roles = "Admin-Role")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthFormMasController : ControllerBase
    {
        private readonly IAuthFormMasService _service;

        public AuthFormMasController( IAuthFormMasService service)
        {
            _service = service;
        }

        // GET: api/auth_form_mas
        //[Authorize(Roles = "Admin")]        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<auth_form_mas>>> GetData([FromQuery]auth_form_mas_filter filter)
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

        // GET: api/auth_form_mas/5
        //[Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<auth_form_mas>> GetData(int id)
        {
            try
            {
                var data = await _service.GetById(id);

                if (data.Item1 == 400)
                    return BadRequest(data.Item2);
                else if (data.Item1 == 404)
                    return NotFound(data.Item2);

                return data.Item3;
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
    }
}
