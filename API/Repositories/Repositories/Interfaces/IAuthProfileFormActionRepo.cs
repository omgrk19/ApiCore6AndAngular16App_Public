using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthProfileFormActionRepo : ICommonDeleteRepo<auth_profile_form_action>
    {
        Task<(int, string, List<auth_profile_form_action_get>)> GetList(auth_profile_form_action_filter filter);
        Task<(int, string, auth_profile_form_action_get)> Add(auth_profile_form_action data);
    }
}
