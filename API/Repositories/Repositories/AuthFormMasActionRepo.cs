using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;
using DataModels.Auth;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class AuthFormMasActionRepo : IAuthFormMasActionRepo
    {
        private readonly AppDbContext _context;

        public AuthFormMasActionRepo(AppDbContext context)
        {
            _context = context;
        }
        

        public async Task<(int, string, List<auth_form_mas_action_get>)> GetList(auth_form_mas_action_filter filter)
        {
            try
            {
                
                if (_context.auth_form_mas_action == null)
                {
                    return (0, "NotFound()", null);
                }

                filter.FormId = filter.FormId == null ? "" : filter.FormId;
                filter.FormName = filter.FormName == null ? "" : filter.FormName;
                filter.ActionId = filter.ActionId == null ? "" : filter.ActionId;

                var data = from x in _context.auth_form_mas_action
                           join y in _context.auth_form_mas on x.FormId equals y.formid
                           where (filter.FormId != "" ? x.FormId == filter.FormId : true)
                           where (filter.FormName != "" ? y.form_name == filter.FormName : true)
                           && (filter.ActionId != "" ? x.ActionId == filter.ActionId : true)
                           orderby x.FormId ascending, x.ActionId ascending
                           select (new auth_form_mas_action_get { Id = x.Id, FormId = x.FormId, ActionId = x.ActionId, FormName = y.form_name });
                

                return (0, "", await data.ToListAsync());

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




    }
}
