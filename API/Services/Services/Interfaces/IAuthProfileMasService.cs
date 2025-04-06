using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAuthProfileMasService : ICommonGetByIdService<auth_profile_mas>, ICommonCreateService<auth_profile_mas>, ICommonUpdateService<auth_profile_mas>, ICommonDeleteService<auth_profile_mas>
    {
        Task<(int, string, List<auth_profile_mas>)> GetList(auth_profile_mas_filter filter);
    }
}
