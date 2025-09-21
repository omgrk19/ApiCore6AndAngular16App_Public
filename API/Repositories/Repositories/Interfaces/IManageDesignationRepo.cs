using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IManageDesignationRepo : ICommonCreateRepo<ManageDesignation>, ICommonDeleteRepo<ManageDesignation>
    {

        Task<(int, string, List<ManageDesignation>)> GetList(ManageDesignation_Filter filter);

    }
}
