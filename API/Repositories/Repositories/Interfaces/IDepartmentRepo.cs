using DataModels.FilterModels;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IDepartmentRepo : ICommonGetByIdRepo<Department>, ICommonCreateRepo<Department>, ICommonUpdateRepo<Department>, ICommonDeleteRepo<Department>
    {

        Task<(int, string, List<Department>)> GetList(DepartmentFilter filter);

    }
}
