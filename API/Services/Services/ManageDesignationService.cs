using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class ManageDesignationService : IManageDesignationService
    {
        private readonly IManageDesignationRepo _repo;

        public ManageDesignationService(IManageDesignationRepo repo)
        {
            _repo = repo;
        }
        public async Task<(int, string, List<ManageDesignation>)> GetList(ManageDesignation_Filter filter)
        {
           return await _repo.GetList(filter);
        }

        public async Task<(int, string, object)> Add(ManageDesignation model)
        {
            return await _repo.Add(model);
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        
    }
}
