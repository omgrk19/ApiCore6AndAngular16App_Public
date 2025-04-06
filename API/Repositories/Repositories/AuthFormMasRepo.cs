using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;
using DataModels.Auth;
using Repositories.Repositories.Interfaces;

namespace WebApiCore6CustomAuth.Repositories
{
    public class AuthFormMasRepo : IAuthFormMasRepo
    {
        private readonly AppDbContext _context;

        public AuthFormMasRepo(AppDbContext context)
        {
            _context = context;
        }


        public async Task<(int, string, List<auth_form_mas>)> GetList(auth_form_mas_filter filter)
        {
            try
            {
                if (_context.auth_form_mas == null)
                {
                    return (0, "NotFound()", null);
                }

                filter.formid = filter.formid == null ? "" : filter.formid;
                filter.Id = filter.Id == null ? 0 : filter.Id;
                var data = from x in _context.auth_form_mas
                           where (filter.Id > 0 ? x.Id == filter.Id : true)
                           && (filter.formid != "" ? x.formid == filter.formid : true)
                           orderby x.Id descending
                           select x;

                return (0, "", await data.ToListAsync());

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<(int, string, auth_form_mas)> GetById(int id)
        {
            try
            {
                if (_context.auth_form_mas == null)
                {
                    return (404, "NotFound()", null);
                }
                var auth_form_mas = await _context.auth_form_mas.FindAsync(id);

                if (auth_form_mas == null)
                {
                    return (404, "NotFound()", null);
                }

                return (0, "", auth_form_mas);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




    }
}
