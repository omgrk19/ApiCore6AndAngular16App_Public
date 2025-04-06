using DataModels.Auth;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AuthUserService : IAuthUserService
    {
        private readonly IAuthUserRepo _repo;

        public AuthUserService(IAuthUserRepo repo)
        {
            _repo = repo;
        }

        public async Task<(int, string, List<auth_user_get>)> GetList()
        {
            return await _repo.GetList();
        }
    }
}
