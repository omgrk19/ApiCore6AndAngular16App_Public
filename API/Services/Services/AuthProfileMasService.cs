using DataModels.Auth;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class AuthProfileMasService : IAuthProfileMasService
    {
        private readonly IAuthProfileMasRepo _repo;

        public AuthProfileMasService(IAuthProfileMasRepo repo)
        {
            this._repo = repo;
        }

        public async Task<(int, string, List<auth_profile_mas>)> GetList(auth_profile_mas_filter filter)
        {
            return await _repo.GetList(filter);
        }

        public async Task<(int, string, auth_profile_mas)> GetById(int id)
        {
            return await _repo.GetById(id);
        }

        public async Task<(int, string, auth_profile_mas)> Add(auth_profile_mas model)
        {
            return await _repo.Add(model);
        }

        public Task<(int, string, auth_profile_mas)> Update(int id, auth_profile_mas Model)
        {
            return _repo.Update(id, Model);
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }


    }
}
