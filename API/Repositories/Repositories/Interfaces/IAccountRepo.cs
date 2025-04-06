using DataModels.Auth;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.IdentityModel.Tokens.Jwt;
using DataModels.Models;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAccountRepo
    {

        Task<auth_user> Login(AccountLoginViewModel model);
        Task<auth_user> GetUserByUserId(string UserId);
        Task UpdateFilePath(UserFileUpdate u, auth_user user);
        Task<auth_user> CreatingNewUser(AccountRegisterViewModel model);
        Task<List<auth_profile_form_action>> AuthProfileFormAction(string profileid);
        Task<(int, string, JwtSecurityToken)> MultiFuntion(auth_user? user);
        Task<(int, string, string)> Register(AccountRegisterViewModel model);
        Task<(int, string, List<SelectListItem>)> UserRoles();
        Task<(int, string, auth_user)> UpdateUserPhotoData(UserFileUpdate u);
        Task<bool> IsDuplicateEmail(string Email);
        Task<(int, string)> ManagingUserProfile(auth_user user2, List<auth_profile_form_action> usedProfileOfRoles);

    }
}
