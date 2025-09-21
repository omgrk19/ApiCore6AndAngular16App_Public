using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Auth
{
    public class auth_profile_form_action
    {
        [Key]
        public int Id { get; set; }
        public string ProfileId { get; set; }
        public string FormId { get; set; }
        public string ActionId { get; set; }

        //[ForeignKey("ProfileId")]
        //public auth_profile_mas Profile { get; set; } = default!;
        //[ForeignKey("FormId")]
        //public auth_form_mas Form { get; set; } = default!;
        //[ForeignKey("Action")]
        //public auth_action Action { get; set; } = default!;
    }
    public class auth_profile_form_action_get : auth_profile_form_action
    {        
        public string FormName { get; set; }        
        public string ProfileName { get; set; }        
    }
    
    public class auth_profile_form_action_filter
    {      
        public string? ProfileId { get; set; }
        public string? FormId { get; set; }
        public string? ActionId { get; set; }
        public string? FormName { get; set; }
        public string? ProfileName { get; set; }
    }
}
