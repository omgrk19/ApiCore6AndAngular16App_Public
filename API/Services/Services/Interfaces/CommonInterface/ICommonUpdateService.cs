using DataModels.Models;

namespace Services.Services.Interfaces.CommonInterface
{
    public interface ICommonUpdateService<T> where T : class
    {
        Task<(int, string, T)> Update(int id, T Model);
    }
}
