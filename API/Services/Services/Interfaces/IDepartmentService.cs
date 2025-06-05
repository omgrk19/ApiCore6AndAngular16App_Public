using DataModels.FilterModels;
using DataModels.Models;
using Services.DTOs;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IDepartmentService : ICommonGetByIdService<DepartmentDTO>, ICommonCreateService<DepartmentInsertDTO>, ICommonUpdateService<DepartmentUpdateDTO>, ICommonDeleteService<Department>
    {
        Task<(int, string, List<DepartmentDTO>)> GetList(DepartmentFilter filter);
    }
}
