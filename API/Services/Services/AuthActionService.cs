using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AuthActionService : IAuthActionService
    {
        private readonly IAuthActionRepo _repo;

        public AuthActionService(IAuthActionRepo repo)
        {
            _repo = repo;
        }

        public async Task<(int, string, List<auth_action>)> GetList(auth_action_filter filter)
        {
            return await _repo.GetList(filter);
        }
        public async Task<(int, string, auth_action)> GetById(int id)
        {
            return await _repo.GetById(id);
        }
        

               

        
    }
}
