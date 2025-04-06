using DataModels.Models;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepo _repo;

        public DepartmentService(IDepartmentRepo repo)
        {
            this._repo = repo;
        }



        public async Task<(int, string, List<Department>)> GetList(Department_Filter filter)
        {
            return await _repo.GetList(filter);
        }

        public async Task<(int, string, Department)> GetById(int id)
        {
            return await _repo.GetById(id);            
        }


        public async Task<(int, string, Department)> Add(Department Department)
        {
            return await _repo.Add(Department);
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        public async Task<(int, string, Department)> Update(int id, Department Department)
        {
            return await _repo.Update(id, Department);
        }


    }
}
