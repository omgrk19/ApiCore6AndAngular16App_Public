using DataModels.Models;


namespace Repositories.Repositories.Interfaces.CommonInterface
{
    public interface ICommonUpdateRepo<T> where T : class
    {
        Task<(int, string, T)> Update(int id, T Model);
    }
}
