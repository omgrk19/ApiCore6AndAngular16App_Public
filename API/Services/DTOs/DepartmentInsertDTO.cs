﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
    public class DepartmentInsertDTO
    {
        [Required]
        public string DepartmentName { get; set; }
    }
}
