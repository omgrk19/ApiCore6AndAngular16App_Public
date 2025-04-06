using DataModels.Models;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IDesignationService : ICommonGetByIdService<Designation>, ICommonCreateService<Designation>, ICommonUpdateService<Designation>, ICommonDeleteService<Designation>
    {
        Task<(int, string, List<Designation>)> GetList(Designation_Filter filter);
    }
}
