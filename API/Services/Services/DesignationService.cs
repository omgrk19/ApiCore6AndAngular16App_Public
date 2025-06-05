using AutoMapper;
using DataModels.FilterModels;
using DataModels.Models;
using Repositories.Repositories.Interfaces;
using Services.DTOs;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class DesignationService : IDesignationService
    {
        private readonly IDesignationRepo _repo;
        private readonly IMapper _mapper;

        public DesignationService(IDesignationRepo repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }


        public async Task<(int, string, DesignationDTO)> GetById(int id)
        {
            var data = await _repo.GetById(id);
            return (data.Item1, data.Item2, _mapper.Map<DesignationDTO>(data.Item3));
        }

        public async Task<(int, string, List<DesignationDTO>)> GetList(DesignationFilter filter)
        {
            var data = await _repo.GetList(filter);
            return (data.Item1, data.Item2, _mapper.Map<List<DesignationDTO>>(data.Item3));
        }

        public async Task<(int, string, object)> Add(DesignationInsertDTO Designation)
        {
            var dataModel = _mapper.Map<Designation>(Designation);
            var data = await _repo.Add(dataModel);
            return (data.Item1, data.Item2, _mapper.Map<DesignationDTO>(data.Item3));
        }

        public async Task<(int, string)> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        public async Task<(int, string, object)> Update(int id, DesignationUpdateDTO Designation)
        {
            var dataModel = _mapper.Map<Designation>(Designation);
            var data = await _repo.Update(id, dataModel);
            return (data.Item1, data.Item2, _mapper.Map<DesignationDTO>(data.Item3));
        }


    }
}
