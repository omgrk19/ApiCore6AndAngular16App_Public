using DataModels.Models;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IEmployeeService : ICommonGetByIdService<Employee>, ICommonCreateService<Employee>, ICommonUpdateService<Employee>, ICommonDeleteService<Employee>
    {

        Task<(int, string, usp_EmployeeDetails_Vm)> GetList(usp_EmployeeDetails_filter filter);
        Task<(int, string)> UpdateEmployeFile(int id, UserFileUpdate userFileUpdate);

    }
}
