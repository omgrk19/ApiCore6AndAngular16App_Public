using DataModels.Auth;
using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAuthUserProfileActionService : ICommonCreateService<auth_user_profile_action>,ICommonDeleteService<auth_user_profile_action>
    {
        Task<(int, string, List<auth_user_profile_action_get>)> GetList(auth_user_profile_action_filter filter);
    }
}
