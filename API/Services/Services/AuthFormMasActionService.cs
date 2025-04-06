using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AuthFormMasActionService : IAuthFormMasActionService
    {
        private readonly IAuthFormMasActionRepo _repo;

        public AuthFormMasActionService(IAuthFormMasActionRepo repo)
        {
            _repo = repo;
        }

        public async Task<(int, string, List<auth_form_mas_action_get>)> GetList(auth_form_mas_action_filter filter)
        {
            return await _repo.GetList(filter);
        }
      
        

               

        
    }
}
