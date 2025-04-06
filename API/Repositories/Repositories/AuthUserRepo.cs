using Microsoft.EntityFrameworkCore;
using DataModels.Auth;
using DataModels.DataUtilities;
using Repositories.Repositories.Interfaces;

namespace Repositories.Repositories
{
    public class AuthUserRepo : IAuthUserRepo
    {
        private readonly AppDbContext _context;

        public AuthUserRepo(AppDbContext context)
        {
            this._context = context;
        }
        public async Task<(int, string, List<auth_user_get>)> GetList()
        {
            if (_context.auth_user == null)
            {
                return (404,"NotFound()",null);
            }

            //filter.action = filter.action == null ? "" : filter.action;
            //filter.Id = filter.Id == null ? 0 : filter.Id;
            var data = from x in _context.auth_user
                           //where (filter.Id > 0 ? x.Id == filter.Id : true)
                           //&& (filter.action != "" ? x.action == filter.action : true)
                       orderby x.username ascending
                       select (new auth_user_get
                       {
                           userid = x.userid,
                           username = x.username,
                           name = x.name,
                           email = x.email,
                           profileid = x.profileid,
                       });
            return (0,"",await data.ToListAsync());
        }
    }
}
