using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAuthFormMasActionService 
    {
        Task<(int, string, List<auth_form_mas_action_get>)> GetList(auth_form_mas_action_filter filter);
    }
}
