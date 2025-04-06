using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using Repositories.Repositories.Interfaces;

namespace WebApiCore6CustomAuth.Repositories
{
    public class UploadingFilesRepo : IUploadingFilesRepo
    {
        private readonly IHttpContextAccessor _http;
        private readonly IHostEnvironment _environment;
        private readonly ClaimsPrincipal User;

        public UploadingFilesRepo(IHttpContextAccessor httpContextAccessor, IHostEnvironment environment)
        {
            _http = httpContextAccessor;
            _environment = environment;
            User = _http.HttpContext.User as ClaimsPrincipal;
            
        }


        public async Task<(int, string, string)> SavePostImage(IFormFile file)
        {
            try
            {
                var fileName = file.FileName;
                string extension = splitExtension(fileName);
                var uniqueFileName = DateTime.Now.ToString("ddMMyyyyHHmmssffffff") + Guid.NewGuid().ToString() + extension;
                var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "folder2");
                var filePath = Path.Combine(uploads, uniqueFileName);

                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                await file.CopyToAsync(new FileStream(filePath, FileMode.Create));

                return (0, "", splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, string)> SavePostImage(IFormFile Image, bool isOverwrite)
        {
            try
            {
                var uniqueFileName = Image.FileName.Replace(" ", "-");
                var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "folder2");
                var filePath = Path.Combine(uploads, uniqueFileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Image.CopyToAsync(fileStream);
                }
                return (0, "", splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, string)> SavePostImage(IFormFile Image, string id)
        {
            try
            {
                var fileName = Image.FileName;
                string extension = splitExtension(fileName);
                var uniqueFileName = id + extension;
                var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "images");
                var filePath = Path.Combine(uploads, uniqueFileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Image.CopyToAsync(fileStream);
                }

                return (0, "", splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, string)> SavePostImageNew(IFormFile Image, string id)
        {
            try
            {
                var fileName = Image.FileName;
                string extension = splitExtension(fileName);
                var uniqueFileName = id + "-" + DateTime.Now.ToString("ddMMyyyyHHmmssffffff") + Guid.NewGuid().ToString() + extension;
                var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "images");
                var filePath = Path.Combine(uploads, uniqueFileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Image.CopyToAsync(fileStream);
                }

                return (0, "", splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, string)> SavePostImageNew(IFormFile Image)
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var fileName = Image.FileName;
            string extension = splitExtension(fileName);
            var uniqueFileName = id + "-" + DateTime.Now.ToString("ddMMyyyyHHmmssffffff") + Guid.NewGuid().ToString() + extension;
            var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "images");
            var filePath = Path.Combine(uploads, uniqueFileName);
            Directory.CreateDirectory(Path.GetDirectoryName(filePath));
            using (Stream fileStream = new FileStream(filePath, FileMode.Create))
            {
                await Image.CopyToAsync(fileStream);
            }

            return (0, "", splitPath(filePath));
        }
        public async Task<(int, string, string)> SavePostDocument(IFormFile Doc, string id)
        {
            try
            {
                var fileName = Doc.FileName;
                string extension = splitExtension(fileName);
                var uniqueFileName = id + extension;
                var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "docs");
                var filePath = Path.Combine(uploads, uniqueFileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Doc.CopyToAsync(fileStream);
                }

                return (0, "", splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<(int, string, string)> SavePostVideo(IFormFile Video, string id)
        {
            try
            {
                var fileName = Video.FileName;
                string extension = splitExtension(fileName);
                var uniqueFileName = id + extension;
                var uploads = Path.Combine(_environment.ContentRootPath, "wwwroot", "videos");
                var filePath = Path.Combine(uploads, uniqueFileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Video.CopyToAsync(fileStream);
                }

                return (0, "", splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string splitPath(string filePath)
        {
            var arr = filePath.Split("wwwroot");
            string path = arr.Length > 0 ? arr[arr.Length - 1] : "";
            path = path.Replace(@"\", @"/");
            string host = _http.HttpContext.Request.Scheme + "://" + _http.HttpContext.Request.Host.Value;
            path = host + path;
            return "{\"path\":\"" + path + "\"}";
        }
        private string splitExtension(string filePath)
        {
            var arr = filePath.Split('.');
            string extension = arr.Length > 0 ? "." + arr[arr.Length - 1] : "";
            return extension;
        }
    }
}
