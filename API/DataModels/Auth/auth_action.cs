using System.ComponentModel.DataAnnotations;

namespace DataModels.Auth
{
    public class auth_action
    {
        [Key]
        public int Id { get; set; }
        public string? action { get; set; }
    }
    public class auth_action_filter
    {
       
        public int? Id { get; set; }
        public string? action { get; set; }
    }
}
