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


        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
    }    

    public class Designation_MasterDb
    {
        public int? DesignationId { get; set; }
        public string? DesignationName { get; set; }
    }

}
