using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAuthFormMasService : ICommonGetByIdService<auth_form_mas>
    {
        Task<(int, string, List<auth_form_mas>)> GetList(auth_form_mas_filter filter);
    }
}
