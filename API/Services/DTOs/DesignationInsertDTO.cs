using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
    public class DesignationInsertDTO
    {
        [Required]
        public string DesignationName { get; set; }
    }
}
