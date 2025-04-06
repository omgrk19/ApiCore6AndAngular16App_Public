using DataModels.Models;

namespace Services.Services.Interfaces.CommonInterface
{
    public interface ICommonDeleteService<T> where T : class
    {
        Task<(int, string)> Delete(int id);
    }
}
