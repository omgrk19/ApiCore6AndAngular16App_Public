using System.ComponentModel.DataAnnotations;

namespace DataModels.Auth
{
    
    public class auth_form_mas
    {
        [Key]
        public int Id { get; set; }
        public string formid { get; set; }
        public string form_name { get; set; }
        public string form_link { get; set; }
        public string model_id { get; set; }
        public bool form_st { get; set; }
    }
    public class auth_form_mas_filter
    {
       
        public int? Id { get; set; }
        public string? formid { get; set; }
        public string? form_name { get; set; }
        
    }
}
