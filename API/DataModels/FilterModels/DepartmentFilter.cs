using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.FilterModels
{
    public class DepartmentFilter : PagingModel
    {
        public int? Id { get; set; }

        public string? DepartmentName { get; set; }
    }
    
}
