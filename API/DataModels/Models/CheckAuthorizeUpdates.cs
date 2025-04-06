using DataModels.Auth;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
//using WebApi.Auth;
using DataModels.DataUtilities;
//using WebApiCore6CustomAuth.Auth;

namespace DataModels.Models
{

    public class CheckAuthorizeUpdates
    {
        private readonly AppDbContext _context;
        public CheckAuthorizeUpdates(AppDbContext context)
        {
            this._context = context;
        }

        public static List<string> Forms = new List<string>()
        {
            "Employee","Department","Designation","ManageDesignation"
        };
        public static List<string> Actions = new List<string>()
        {
            "List","View","Add","Edit","Delete","Download","Upload"
        };
        public static List<string> G_UserProfiles = new List<string>()
        {
            "Admin","User"
        };

        public async Task CheckEntry()
        {
            try
            {
                //updating action list
                var newActionList = new List<string>();
                var actionList = await _context.auth_action.ToListAsync();
                //var actionList=new List<auth_action>();
                int oldCount = actionList.Count;
                int count = 0;
                foreach (var action in Actions)
                    if (!actionList.Any(x => x.action == action))
                        //count++;
                        newActionList.Add(action);

                if (actionList.Count != Actions.Count)
                {
                    foreach (var item in newActionList)
                    {
                        await _context.auth_action.AddRangeAsync(new auth_action { Id = 0, action = item });
                    }
                    await _context.SaveChangesAsync();
                }

                //updating form list
                var newFormList = new List<string>();
                var formList = await _context.auth_form_mas.ToListAsync();
                oldCount = formList.Count;
                count = 0;
                foreach (var form in Forms)
                    if (!formList.Any(x => x.form_name == form))
                        //count++;
                        newFormList.Add(form);

                if (formList.Count != Forms.Count)
                {
                    foreach (var item in newFormList)
                    {
                        await _context.auth_form_mas.AddRangeAsync(new auth_form_mas { Id = 0, form_name = item, formid = item, form_link = "", model_id = "Model", form_st = true });
                    }
                    await _context.SaveChangesAsync();
                }

                #region Form Action
                //Get List of forms actions
                var formsActions = await _context.auth_form_mas_action.ToListAsync();

                //check form action
                foreach (string form in Forms)
                {
                    Debug.WriteLine("Form: " + form);
                    foreach (string action in Actions)
                    {
                        Debug.WriteLine("Action: " + action);
                        //Check Employee
                        if (form == "Employee" && (action == "List" || action == "View" || action == "Add"
                            || action == "Edit" || action == "Delete" || action == "Download" || action == "Upload"))
                        {
                            if (!formsActions.Any(x => x.FormId == form && x.ActionId == action))
                            {
                                await _context.auth_form_mas_action.AddAsync(new auth_form_mas_action
                                {
                                    Id = 0,
                                    FormId = form,
                                    ActionId = action
                                });
                                await _context.SaveChangesAsync();
                            }
                        }

                        //Check Department
                        if (form == "Department" && (action == "List" || action == "View" || action == "Add" || action == "Edit" || action == "Delete"))
                        {
                            if (!formsActions.Any(x => x.FormId == form && x.ActionId == action))
                            {
                                await _context.auth_form_mas_action.AddAsync(new auth_form_mas_action
                                {
                                    Id = 0,
                                    FormId = form,
                                    ActionId = action
                                });
                                await _context.SaveChangesAsync();
                            }
                        }

                        //Check Designation
                        if (form == "Designation" && (action == "List" || action == "View" || action == "Add" || action == "Edit" || action == "Delete"))
                        {
                            if (!formsActions.Any(x => x.FormId == form && x.ActionId == action))
                            {
                                await _context.auth_form_mas_action.AddAsync(new auth_form_mas_action
                                {
                                    Id = 0,
                                    FormId = form,
                                    ActionId = action
                                });
                                await _context.SaveChangesAsync();
                            }
                        }

                        //Check ManageDesignation
                        if (form == "ManageDesignation" && (action == "List" || action == "Add" || action == "Delete"))
                        {
                            if (!formsActions.Any(x => x.FormId == form && x.ActionId == action))
                            {
                                await _context.auth_form_mas_action.AddAsync(new auth_form_mas_action
                                {
                                    Id = 0,
                                    FormId = form,
                                    ActionId = action
                                });
                                await _context.SaveChangesAsync();
                            }
                        }
                    }
                }

                #endregion

                #region Profile Form Action
                //Get List of forms actions                
                var adminProfileFormAction = await _context.auth_profile_form_action.Where(x => x.ProfileId == "Admin").ToListAsync();
                var profileFormAction = await _context.auth_form_mas_action.ToListAsync();
                
                var profileFormActionRaw =
                                        (from x in profileFormAction
                                         join y in adminProfileFormAction on new { x.FormId, x.ActionId } equals new { y.FormId, y.ActionId }
                                         into y_lj
                                         from y in y_lj.DefaultIfEmpty()
                                             //where x.FormId == null
                                         select (new auth_profile_form_action
                                         {
                                             FormId = x.FormId,
                                             ActionId = x.ActionId,
                                             ProfileId = (y == null ? "" : y.ProfileId),                                            
                                         })).ToList();

                //adding missing entry in Profile FormA ction
                var profileFormActionFilteredList = profileFormActionRaw.Where(x => x.ProfileId == "").ToList();
                if (profileFormActionFilteredList.Count > 0)
                {
                    foreach (var item in profileFormActionFilteredList)
                    {
                        await _context.auth_profile_form_action.AddAsync(new auth_profile_form_action
                        {
                            Id = 0,
                            ProfileId = "Admin",
                            FormId = item.FormId,
                            ActionId = item.ActionId
                        });
                    }
                    await _context.SaveChangesAsync();
                }

                #endregion
                
            }
            catch (Exception ex)
            {

            }
        }

    }
}
