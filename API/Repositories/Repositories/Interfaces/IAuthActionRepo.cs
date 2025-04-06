using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthActionRepo : ICommonGetByIdRepo<auth_action>
    {

        Task<(int, string, List<auth_action>)> GetList(auth_action_filter filter);

    }
}
