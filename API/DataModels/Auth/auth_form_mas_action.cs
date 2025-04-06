using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Auth
{

    public class auth_form_mas_action
    {
        [Key]
        public int Id { get; set; }
        public string FormId { get; set; }
        public string ActionId { get; set; }
    }
    public class auth_form_mas_action_get : auth_form_mas_action
    {

        public string FormName { get; set; }

    }
    public class auth_form_mas_action_filter
    {
        public string? FormId { get; set; }
        public string? ActionId { get; set; }
        public string? FormName { get; set; }

    }
}
