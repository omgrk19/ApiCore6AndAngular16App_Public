using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class DesignationService : IDesignationService
    {
        private readonly IDesignationRepo _repo;

        public DesignationService(IDesignationRepo repo)
        {
            this._repo = repo;
        }


        public async Task<(int, string, Designation)> GetById(int id)
        {
            return await _repo.GetById(id);
        }

        public async Task<(int, string, List<Designation>)> GetList(Designation_Filter filter)
        {
            return await _repo.GetList(filter);
        }

        public async Task<(int, string, Designation)> Add(Designation Designation)
        {
            return await _repo.Add(Designation);
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        public async Task<(int, string, Designation)> Update(int id, Designation Designation)
        {
            return await _repo.Update(id, Designation);
        }


    }
}
