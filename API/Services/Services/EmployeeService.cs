using AutoMapper;
using DataModels.FilterModels;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.DTOs;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepo _repo;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepo repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }

        public async Task<(int, string, object)> Add(EmployeeInserteDTO Employee)
        {
            var model = _mapper.Map<Employee>(Employee);
            var data = await _repo.Add(model);
            return (data.Item1, data.Item2, _mapper.Map<EmployeeDTO>(data.Item3));
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        public async Task<(int, string, EmployeeDTO)> GetById(int id)
        {
            var data = await _repo.GetById(id);
            //return await _repo.GetById(id);
            return (data.Item1, data.Item2, _mapper.Map<EmployeeDTO>(data.Item3));
        }

        //public async Task<(int, string, usp_EmployeeDetails_Vm)> GetList(EmployeeFilter filter)
        public async Task<(int, string, Employee_Vm)> GetList(EmployeeFilter filter)
        {
            return await _repo.GetList(filter);
        }

        public async Task<(int, string, object)> Update(int id, EmployeeUpdateDTO Employee)
        {
            var model = _mapper.Map<Employee>(Employee);
            var data = await _repo.Update(id, model);
            return (data.Item1, data.Item2, _mapper.Map<EmployeeDTO>(data.Item3));
        }

        public async Task<(int, string)> UpdateEmployeFile(int id, UserFileUpdate userFileUpdate)
        {
            return await _repo.UpdateEmployeFile(id, userFileUpdate);
        }
    }
}
