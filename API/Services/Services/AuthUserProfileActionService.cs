using DataModels.Auth;
using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AuthUserProfileActionService : IAuthUserProfileActionService
    {
        private readonly IAuthUserProfileActionRepo _repo;

        public AuthUserProfileActionService(IAuthUserProfileActionRepo repo)
        {
            _repo = repo;
        }

        public async Task<(int, string, List<auth_user_profile_action_get>)> GetList(auth_user_profile_action_filter filter)
        {
            return await _repo.GetList(filter);
        }

        public async Task<(int, string, object)> Add(auth_user_profile_action model)
        {
            return await _repo.Add(model);
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        
    }
}
