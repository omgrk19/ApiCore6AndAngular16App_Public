using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AuthFormMasService : IAuthFormMasService
    {
        private readonly IAuthFormMasRepo _repo;

        public AuthFormMasService(IAuthFormMasRepo repo)
        {
            _repo = repo;
        }

        public async Task<(int, string, List<auth_form_mas>)> GetList(auth_form_mas_filter filter)
        {
            return await _repo.GetList(filter);
        }
        public async Task<(int, string, auth_form_mas)> GetById(int id)
        {
            return await _repo.GetById(id);
        }
        

               

        
    }
}
