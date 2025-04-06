using DataModels.Models;


namespace Repositories.Repositories.Interfaces.CommonInterface
{
    public interface ICommonGetByIdRepo<T> where T : class
    {
        Task<(int, string, T)> GetById(int id);
    }
}
