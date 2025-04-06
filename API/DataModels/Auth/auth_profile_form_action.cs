using System.ComponentModel.DataAnnotations;

namespace DataModels.Auth
{
    public class auth_profile_form_action
    {
        [Key]
        public int Id { get; set; }
        public string ProfileId { get; set; }
        public string FormId { get; set; }
        public string ActionId { get; set; }
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
