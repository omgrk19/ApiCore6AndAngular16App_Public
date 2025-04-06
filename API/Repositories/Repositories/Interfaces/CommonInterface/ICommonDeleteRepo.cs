using DataModels.Models;


namespace Repositories.Repositories.Interfaces.CommonInterface
{
    public interface ICommonDeleteRepo<T> where T : class
    {        
        Task<(int, string)> Delete(int id);
    }
}
