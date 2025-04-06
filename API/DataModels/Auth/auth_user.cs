using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using DataModels.Models;

namespace DataModels.Auth
{
    public partial class auth_user_meta
    {
        [Display(Name = "Code")]
        public int? srno { get; set; }
        [Display(Name = "User No")]
        public string userid { get; set; }
        [Display(Name = "User ID")]
        public string username { get; set; }

        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string passwd { get; set; }
        [Display(Name = "Name")]
        public string name { get; set; }
        public string profileid { get; set; }
        public bool? login_status { get; set; }
        public DateTime? login_date { get; set; }
        public DateTime? logout_date { get; set; }
        [Display(Name = "Status")]
        public bool? st { get; set; }
    }

    public partial class auth_user_mvv
    {
        public auth_user auth_user { get; set; }
        public List<auth_user> auth_user_list { get; set; }
        public List<auth_user_profile_action> auth_user_profile_actions { get; set; }
        public MessageDetail messageDetail { get; set; }
    }

    public class Custom_User_Session
    {
        public auth_user auth_user { get; set; }
        public DateTime expireOn { get; set; }
        public string tokenValue { get; set; }

    }

    [ModelMetadataType(typeof(auth_user_meta))]
    public partial class auth_user
    {
        [Key]
        public int srno { get; set; }
        public string? user_type { get; set; }
        public string? userid { get; set; }
        [Required]
        public string? username { get; set; }
        [Required]
        public string passwd { get; set; }
        public string? api_passwd_key { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? profileid { get; set; }
        public string? Com_Code { get; set; }
        public string? PhotoUrl { get; set; }
        public bool? login_status { get; set; }
        public DateTime? login_date { get; set; }
        public DateTime? logout_date { get; set; }
        public bool? st { get; set; }
        public bool? Profile_Passw_St { get; set; }
    }

    public partial class auth_user_get
    {          
        public string? userid { get; set; }        
        public string? username { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? profileid { get; set; }
    }

    public partial class auth_change_pass
    {
        public string password_old { get; set; }
        public string password { get; set; }
        public string password_confirm { get; set; }
    }

    public partial class Auth_user_profile
    {
        [Key]
        public decimal Srno { get; set; }
        public string profileid { get; set; }
        public string formid { get; set; }
        public string formname { get; set; }
        public bool? view_ { get; set; }
        public bool? add_ { get; set; }
        public bool? edit_ { get; set; }
        public bool? del_ { get; set; }
    }
}
