using DataModels.Auth;
using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IAuthUserService 
    {
        Task<(int, string, List<auth_user_get>)> GetList();
    }
}
