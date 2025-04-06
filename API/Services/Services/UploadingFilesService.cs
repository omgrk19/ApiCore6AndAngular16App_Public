using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using WebApiCore6CustomAuth.Repositories;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class UploadingFilesService : IUploadingFilesService
    {
        private IUploadingFilesRepo _repo;
        //private readonly IHttpContextAccessor _httpContextAccessor;
        //private readonly IHostEnvironment _environment;
        //private readonly ClaimsPrincipal _user;

        public UploadingFilesService(IUploadingFilesRepo repo)
        {
            _repo = repo;
        }
        

        public async Task<(int, string, string)> SavePostImage(IFormFile file)
        {
            return await _repo.SavePostImage(file);
        }

        public async Task<(int, string, string)> SavePostImage(IFormFile Image, bool isOverwrite)
        {
            return await _repo.SavePostImage(Image, isOverwrite);
        }

        public async Task<(int, string, string)> SavePostImage(IFormFile Image, string id)
        {
            return await _repo.SavePostImage(Image, id);
        }

        public async Task<(int, string, string)> SavePostImageNew(IFormFile Image, string id)
        {
            return await _repo.SavePostImageNew(Image, id);
        }

        public async Task<(int, string, string)> SavePostImageNew(IFormFile Image)
        {
            return await _repo.SavePostImageNew(Image);
        }

        public async Task<(int, string, string)> SavePostDocument(IFormFile Doc, string id)
        {
            return await _repo.SavePostDocument(Doc, id);
        }
        public async Task<(int, string, string)> SavePostVideo(IFormFile Video, string id)
        {
            return await _repo.SavePostVideo(Video, id);
        }
    }
}
