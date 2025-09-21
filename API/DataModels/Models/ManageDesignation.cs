using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Models
{
    public class ManageDesignation
    {
        [Key]
        public int Id { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }

        [ForeignKey("DepartmentId")]
        public Department? Department { get; set; } = default!;
        [ForeignKey("DesignationId")]
        public Designation? Designation { get; set; } = default!;
    }
    public class ManageDesignation_Get : ManageDesignation
    {
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
    }
    public class ManageDesignation_Filter
    {
        public int? Id { get; set; }
        public int? DepartmentId { get; set; }
        public int? DesignationId { get; set; }
    }

}
