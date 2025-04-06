using System.ComponentModel.DataAnnotations;

namespace DataModels.Models
{
    public class AccountLoginViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[Display(Name = "Remember Me")]
        //public bool RememberMe { get; set; }
        //public string ReturnUrl { get; set; }
        //public IList<AuthenticationScheme> ExternalLogin { get; set; }
    }
}
