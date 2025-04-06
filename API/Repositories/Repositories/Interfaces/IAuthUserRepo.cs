using DataModels.Auth;
using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IAuthUserRepo 
    {

        Task<(int, string, List<auth_user_get>)> GetList();

    }
}
