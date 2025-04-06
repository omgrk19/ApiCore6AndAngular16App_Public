using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IEmployeeRepo : ICommonGetByIdRepo<Employee>, ICommonCreateRepo<Employee>, ICommonUpdateRepo<Employee>, ICommonDeleteRepo<Employee>
    {
        Task<(int, string, usp_EmployeeDetails_Vm)> GetList(usp_EmployeeDetails_filter filter);
        Task<(int, string)> UpdateEmployeFile(int id, UserFileUpdate userFileUpdate);
    }
}
