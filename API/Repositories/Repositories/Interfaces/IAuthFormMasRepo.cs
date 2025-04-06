using DataModels.Models;
using DataModels.Auth;

using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthFormMasRepo : ICommonGetByIdRepo<auth_form_mas>
    {

        Task<(int, string, List<auth_form_mas>)> GetList(auth_form_mas_filter filter);

    }
}
