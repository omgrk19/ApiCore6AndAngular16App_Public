using DataModels.FilterModels;
using DataModels.Models;
using Services.DTOs;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IEmployeeService : ICommonGetByIdService<EmployeeDTO>, ICommonCreateService<EmployeeInserteDTO>, ICommonUpdateService<EmployeeUpdateDTO>, ICommonDeleteService<Employee>
    {

        //Task<(int, string, usp_EmployeeDetails_Vm)> GetList(EmployeeFilter filter);
        Task<(int, string, Employee_Vm)> GetList(EmployeeFilter filter);
        Task<(int, string)> UpdateEmployeFile(int id, UserFileUpdate userFileUpdate);

    }
}
