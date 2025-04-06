using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IDepartmentService : ICommonGetByIdService<Department>, ICommonCreateService<Department>, ICommonUpdateService<Department>, ICommonDeleteService<Department>
    {
        Task<(int, string, List<Department>)> GetList(Department_Filter filter);
    }
}
