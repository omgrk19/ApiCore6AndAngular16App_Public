using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthFormMasActionRepo
    {
        Task<(int, string, List<auth_form_mas_action_get>)> GetList(auth_form_mas_action_filter filter);
    }
}
