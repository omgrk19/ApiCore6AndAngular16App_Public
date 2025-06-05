using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.FilterModels
{
    public class EmployeeFilter : PagingModel
    {
        
        public string? FirstName { get; set; }
        public int? Id { get; set; }
        public int? DesignationId { get; set; }
        public int? DepartmentId { get; set; }
        public string? Mobile { get; set; }

    }
    
}
