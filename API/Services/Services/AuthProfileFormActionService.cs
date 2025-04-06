using DataModels.Auth;
using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AuthProfileFormActionService : IAuthProfileFormActionService
    {
        private readonly IAuthProfileFormActionRepo _repo;

        public AuthProfileFormActionService(IAuthProfileFormActionRepo repo)
        {
            _repo = repo;
        }

        public async Task<(int, string, List<auth_profile_form_action_get>)> GetList(auth_profile_form_action_filter filter)
        {
            return await _repo.GetList(filter);
        }

        public async Task<(int, string, auth_profile_form_action)> Add(auth_profile_form_action model)
        {
            return await _repo.Add(model);    
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

       
    }
}
