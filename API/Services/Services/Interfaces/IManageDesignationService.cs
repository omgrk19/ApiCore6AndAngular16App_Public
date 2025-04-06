using DataModels.Auth;
using DataModels.Models;
using Services.Services.Interfaces.CommonInterface;

namespace Services.Services.Interfaces
{
    public interface IManageDesignationService : ICommonCreateService<ManageDesignation>, ICommonDeleteService<ManageDesignation>
    {
        Task<(int, string, List<ManageDesignation_Get>)> GetList(ManageDesignation_Filter filter);
    }
}
