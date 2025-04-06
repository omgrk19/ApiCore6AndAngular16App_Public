using System.ComponentModel.DataAnnotations;

namespace DataModels.Models
{
    public class AccountRegisterViewModel
    {
        

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        [Required]
        public string Role { get; set; }

        [Required]
        public bool LoginStatus { get; set; }

    }
}
