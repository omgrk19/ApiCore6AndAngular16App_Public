using AutoMapper;
using DataModels.FilterModels;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.DTOs;
using Services.Services.Interfaces;
using Services.Validators;

namespace Services.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepo _repo;
        private readonly IMapper _mapper;

        public DepartmentService(IDepartmentRepo repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }



        public async Task<(int, string, List<DepartmentDTO>)> GetList(DepartmentFilter filter)
        {
            var data = await _repo.GetList(filter);
            return (data.Item1, data.Item2, _mapper.Map<List<DepartmentDTO>>(data.Item3));            
        }

        public async Task<(int, string, DepartmentDTO)> GetById(int id)
        {
            //return await _repo.GetById(id);
            var data = await _repo.GetById(id);
            return (data.Item1, data.Item2, _mapper.Map<DepartmentDTO>(data.Item3));
        }


        public async Task<(int, string, object)> Add(DepartmentInsertDTO departmentInsertDTO)
        {
            var dataModel = _mapper.Map<Department>(departmentInsertDTO);
            //var dataModel = _mapper.Map(departmentInsertDTO, new Department());
            var data = await _repo.Add(dataModel);            
            return (data.Item1,data.Item2, _mapper.Map<DepartmentDTO>(data.Item3));
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        public async Task<(int, string, object)> Update(int id, DepartmentUpdateDTO Department)
        {
            var dataModel = _mapper.Map<Department>(Department);
            var data = await _repo.Update(id, dataModel);
            return (data.Item1, data.Item2, _mapper.Map<DepartmentDTO>(data.Item3));
        }


    }
}
