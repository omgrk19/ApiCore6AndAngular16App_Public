using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthProfileMasRepo : ICommonGetByIdRepo<auth_profile_mas>, ICommonCreateRepo<auth_profile_mas>, ICommonUpdateRepo<auth_profile_mas>, ICommonDeleteRepo<auth_profile_mas>
    {
        Task<(int, string, List<auth_profile_mas>)> GetList(auth_profile_mas_filter filter);
    }
}
