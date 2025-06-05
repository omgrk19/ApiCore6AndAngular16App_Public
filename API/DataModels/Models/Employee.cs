using System.ComponentModel.DataAnnotations;

namespace DataModels.Models
{
    public class Employee
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public int? DepartmentId { get; set; }
        public int? DesignationId { get; set; }
        public string? EmailId { get; set; }
        public string? Mobile { get; set; }
        public string? Password { get; set; }
        [Required]
        public bool IsMarried { get; set; }
        public string Gender { get; set; }
        public DateTime? BirthDate { get; set; }        
        [Required]
        public bool IsActive { get; set; }
        public string? PhotoUrl { get; set; }
        public string? DocumentUrl { get; set; }
        public string? VideoUrl { get; set; }

        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
    }
    public class usp_EmployeeDetails
    {
        [Key]
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? DepartmentId { get; set; }
        public int? DesignationId { get; set; }
        public string? DesignationName { get; set; }
        public string? DepartmentName { get; set; }
        public string? EmailId { get; set; }
        public string? Mobile { get; set; }
        public string? Password { get; set; }
        [Required]
        public bool? IsMarried { get; set; }
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        
        public bool? IsActive { get; set; }
        public string? PhotoUrl { get; set; }
        public string? DocumentUrl { get; set; }
        public string? VideoUrl { get; set; }


        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }

        public int? RowNo { get; set; }
    }
    
    public class usp_EmployeeDetails_Vm
    {
        public int pageNo { get; set; }
        public int pageSize { get; set; }
        public int totalRecords { get; set; }
        public List<usp_EmployeeDetails> EmployeeDetails_List { get; set; }
    }

    public class EmployeeDetailDb : Designation_MasterDb
    {

        public int? UserId { get; set; }
        public int? RowNo { get; set; }
        public int? TotalRecords { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? EmailId { get; set; }
        public string? Password { get; set; }
        public bool? IsMarried { get; set; }
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }        
        public bool? IsActive { get; set; }
    }
    


    public class EmployeeDetail
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Department { get; set; }
        public string? Designation { get; set; }
        public string? EmailId { get; set; }
    }

    public class Login
    {
        [Required]
        public string EmailId { get; set; }
        [Required]
        public string? Password { get; set; }
    }
    public class UserFileUpdate
    {        
        [Required]
        public string? Type { get; set; }
        [Required]
        public string? FilePath { get; set; }
    }
}
