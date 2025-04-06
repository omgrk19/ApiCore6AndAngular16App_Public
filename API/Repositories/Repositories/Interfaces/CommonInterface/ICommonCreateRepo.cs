using DataModels.Models;


namespace Repositories.Repositories.Interfaces.CommonInterface
{
    public interface ICommonCreateRepo<T> where T : class
    {
        Task<(int, string, T)> Add(T Model);
    }
}
