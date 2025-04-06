using Microsoft.AspNetCore.Http;
using DataModels.Auth;
using DataModels.Models;
using Repositories.Repositories.Interfaces.CommonInterface;

namespace Repositories.Repositories.Interfaces
{
    public interface IUploadingFilesRepo  
    {

        Task<(int, string, string)> SavePostImage(IFormFile file);
        Task<(int, string, string)> SavePostImage(IFormFile Image, bool isOverwrite);
        Task<(int, string, string)> SavePostImage(IFormFile Image, string id);
        Task<(int, string, string)> SavePostImageNew(IFormFile Image, string id);
        Task<(int, string, string)> SavePostImageNew(IFormFile Image);
        Task<(int, string, string)> SavePostDocument(IFormFile Doc, string id);
        Task<(int, string, string)> SavePostVideo(IFormFile Video, string id);

    }
}
