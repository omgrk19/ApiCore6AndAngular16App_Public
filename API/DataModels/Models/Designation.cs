using System.ComponentModel.DataAnnotations;
using DataModels.DataUtilities;

namespace DataModels.Models
{
    public class Designation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string DesignationName { get; set; }
    }
    public class Designation_Filter
    {        
        public int? Id { get; set; }        
        public string? DesignationName { get; set; }
    }

    public class Designation_MasterDb
    {
        public int? DesignationId { get; set; }
        public string? DesignationName { get; set; }
    }

}
