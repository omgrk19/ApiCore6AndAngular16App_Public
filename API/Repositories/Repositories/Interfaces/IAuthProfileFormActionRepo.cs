using DataModels.Auth;
using DataModels.Models;
//using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthProfileFormActionRepo : ICommonCreateRepo<auth_profile_form_action>,ICommonDeleteRepo<auth_profile_form_action>
    {
        Task<(int, string, List<auth_profile_form_action_get>)> GetList(auth_profile_form_action_filter filter);
    }
}
