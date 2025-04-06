using DataModels.Auth;
using DataModels.Models;
using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthUserProfileActionRepo : ICommonCreateRepo<auth_user_profile_action>,ICommonDeleteRepo<auth_user_profile_action>
    {
        Task<(int, string, List<auth_user_profile_action_get>)> GetList(auth_user_profile_action_filter filter);
    }
}
