using Microsoft.AspNetCore.Identity;

namespace DataModels.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? City { get; set; }
    }
}
