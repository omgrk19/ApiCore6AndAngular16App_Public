using System.ComponentModel.DataAnnotations;

namespace DataModels.Auth
{
    public class auth_profile_mas
    {
        [Key]   
        public int Id { get; set; }
        public string ProfileId { get; set; }
        public string Profile_Name { get; set; }
        public string? Profile_Desc { get; set; }
        public bool Profile_St { get; set; }
    }
    public class auth_profile_mas_filter
    {        
        public int? Id { get; set; }
        public string? ProfileId { get; set; }
        public string? Profile_Name { get; set; }        
        public bool? Profile_St { get; set; }
    }
}
