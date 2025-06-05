using System.ComponentModel.DataAnnotations;

namespace DataModels.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string DepartmentName { get; set; }

        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }

    }    
    
}
