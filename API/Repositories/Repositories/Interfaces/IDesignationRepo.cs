using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IDesignationRepo : ICommonGetByIdRepo<Designation>, ICommonCreateRepo<Designation>, ICommonUpdateRepo<Designation>, ICommonDeleteRepo<Designation>
    {

        Task<(int, string, List<Designation>)> GetList(Designation_Filter filter);

    }
}
