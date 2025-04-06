using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadingFiles_BackupController : ControllerBase
    {
        private readonly IHostEnvironment _environment;

        public UploadingFiles_BackupController(IHostEnvironment environment)
        {
            _environment = environment;
        }


        [HttpPost("unique")]
        public async Task<IActionResult> SavePostImageAsync(IFormFile file)
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

                return Ok(splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        [HttpPost("same/{isOverwrite}")]
        public async Task<IActionResult> SavePostImageAsync(IFormFile Image, bool isOverwrite)
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
                return Ok(splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost("image/{id}")]
        public async Task<IActionResult> SavePostImageAsync(IFormFile Image, string id)
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

                return Ok(splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [HttpPost("imageNew/{id}")]
        public async Task<IActionResult> SavePostImageNewAsync(IFormFile Image, string id)
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

                return Ok(splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        [HttpPost("imageNew")]
        public async Task<IActionResult> SavePostImageNewAsync(IFormFile Image)
        {
            try
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

                return Ok(splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [HttpPost("doc/{id}")]
        public async Task<IActionResult> SavePostDocumentAsync(IFormFile Doc, string id)
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

                return Ok(splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        [HttpPost("video/{id}")]
        public async Task<IActionResult> SavePostVideoAsync(IFormFile Video, string id)
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

                return Ok(splitPath(filePath));
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        private string splitPath(string filePath)
        {
            var arr = filePath.Split("wwwroot");
            string path = arr.Length > 0 ? arr[arr.Length - 1] : "";
            path = path.Replace(@"\", @"/");
            string host = Request.Scheme + "://" + Request.Host.Value;
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
