using DataModels.FilterModels;
using DataModels.Models;
using Services.DTOs;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IDesignationService : ICommonGetByIdService<DesignationDTO>, ICommonCreateService<DesignationInsertDTO>, ICommonUpdateService<DesignationUpdateDTO>, ICommonDeleteService<Designation>
    {
        Task<(int, string, List<DesignationDTO>)> GetList(DesignationFilter filter);
    }
}
