﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
    public class EmployeeUpdateDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public int? DepartmentId { get; set; }
        public int? DesignationId { get; set; }
        //[EmailAddress]
        public string? EmailId { get; set; }
        public string? Mobile { get; set; }
        public string? Password { get; set; }

        public bool IsMarried { get; set; }
        public string Gender { get; set; }
        public DateTime? BirthDate { get; set; }      

        public bool IsActive { get; set; }
        public string? PhotoUrl { get; set; }
        public string? DocumentUrl { get; set; }
        public string? VideoUrl { get; set; }
    }
}
