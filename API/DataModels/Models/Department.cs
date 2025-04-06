using System.ComponentModel.DataAnnotations;

namespace DataModels.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string DepartmentName { get; set; }
    }
    public class Department_Filter
    {
        public int? Id { get; set; }
        public string? DepartmentName { get; set; }
    }
}
