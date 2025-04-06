using DataModels.Auth;
using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;

using Repositories.Repositories.Interfaces;

namespace WebApiCore6CustomAuth.Repositories
{
    public class AuthActionRepo : IAuthActionRepo
    {
        private readonly AppDbContext _context;

        public AuthActionRepo(AppDbContext context)
        {
            _context = context;
        }


        public async Task<(int, string, List<auth_action>)> GetList(auth_action_filter filter)
        {
            try
            {
                if (_context.auth_action == null)
                {
                    return (404, "NotFound()", null);
                }

                filter.action = filter.action == null ? "" : filter.action;
                filter.Id = filter.Id == null ? 0 : filter.Id;
                var data = from x in _context.auth_action
                           where (filter.Id > 0 ? x.Id == filter.Id : true)
                           && (filter.action != "" ? x.action == filter.action : true)
                           orderby x.Id descending
                           select x;

                return (0, "", await data.ToListAsync());

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<(int, string, auth_action)> GetById(int id)
        {
            if (_context.auth_action == null)
            {
                return (404, "NotFound()", null);
            }
            var auth_action = await _context.auth_action.FindAsync(id);

            if (auth_action == null)
            {
                return (404, "NotFound()", null);
            }

            return (0, "", auth_action);
        }




    }
}
