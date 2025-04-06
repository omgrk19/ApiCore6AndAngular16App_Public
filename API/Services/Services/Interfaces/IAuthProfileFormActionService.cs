using DataModels.Auth;
using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAuthProfileFormActionService: ICommonCreateService<auth_profile_form_action>,ICommonDeleteService<auth_profile_form_action>
    {
        Task<(int, string, List<auth_profile_form_action_get>)> GetList(auth_profile_form_action_filter filter);
    }
}
