using DataModels.Models;

namespace Services.Services.Interfaces.CommonInterface
{
    public interface ICommonGetByIdService<T> where T : class
    {
        Task<(int, string, T)> GetById(int id);


    }
}
