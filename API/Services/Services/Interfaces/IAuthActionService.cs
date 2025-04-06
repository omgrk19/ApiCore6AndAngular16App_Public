using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAuthActionService : ICommonGetByIdService<auth_action>
    {
        Task<(int, string, List<auth_action>)> GetList(auth_action_filter filter);
    }
}
