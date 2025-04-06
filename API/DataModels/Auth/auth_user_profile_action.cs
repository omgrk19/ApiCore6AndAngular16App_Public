using System.ComponentModel.DataAnnotations;

namespace DataModels.Auth
{
    public class AuthParams
    {
        public string form { get; set; }
        public List<string> actions { get; set; }
    }

    public class auth_user_profile
    {
        [Key]
        public int Srno { get; set; }
        public string userid { get; set; }
        public string profileid { get; set; }
        public string formid { get; set; }
    }

    public class auth_user_profile_action
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ProfileId { get; set; }
        public string FormId { get; set; }
        public string ActionId { get; set; }
    }
    public class auth_user_profile_action_get : auth_user_profile_action
    {
        public string ProfileName { get; set; }
        public string FormName { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
    public class auth_user_profile_action_filter
    {
      
        public int? Id { get; set; }
        public string? UserId { get; set; }
        public string? ProfileId { get; set; }
        public string? FormId { get; set; }
        public string? ActionId { get; set; }
        public string? ProfileName { get; set; }
        public string? FormName { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
    }


}
