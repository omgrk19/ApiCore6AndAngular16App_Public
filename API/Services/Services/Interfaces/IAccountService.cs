using Microsoft.AspNetCore.Mvc.Rendering;
using System.IdentityModel.Tokens.Jwt;
using DataModels.Auth;
using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAccountService
    {
        Task<auth_user> Login(AccountLoginViewModel model);
        Task<JwtSecurityToken> MultiFuntion(auth_user? user);
        Task<auth_user> CreatingNewUser(AccountRegisterViewModel model);
        Task<(int, string, List<SelectListItem>)> UserRoles();
        Task<(int, string, string)> UpdateUserPhotoData(UserFileUpdate u,string signedin_userid);
        Task<bool> IsDuplicateEmail(string Email);
        Task<List<auth_profile_form_action>> AuthProfileFormAction(string profileid);
        Task<(int, string)> ManagingUserProfile(auth_user user2, List<auth_profile_form_action> usedProfileOfRoles);
    }
}
