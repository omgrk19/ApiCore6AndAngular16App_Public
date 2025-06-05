using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
    public class DesignationDTO
    {
        
        public int Id { get; set; }        
        public string? DesignationName { get; set; }
    }
}
