using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepo _repo;

        public EmployeeService(IEmployeeRepo repo)
        {
            this._repo = repo;
        }

        public async Task<(int, string, Employee)> Add(Employee Employee)
        {
            return await _repo.Add(Employee);
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        public async Task<(int, string, Employee)> GetById(int id)
        {
            return await _repo.GetById(id);
        }

        public async Task<(int, string, usp_EmployeeDetails_Vm)> GetList(usp_EmployeeDetails_filter filter)
        {
            return await _repo.GetList(filter);
        }

        public async Task<(int, string, Employee)> Update(int id, Employee Employee)
        {
            return await _repo.Update(id, Employee);
        }

        public async Task<(int, string)> UpdateEmployeFile(int id, UserFileUpdate userFileUpdate)
        {
            return await _repo.UpdateEmployeFile(id, userFileUpdate);
        }
    }
}
