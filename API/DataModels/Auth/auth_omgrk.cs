﻿using System.ComponentModel.DataAnnotations;

namespace DataModels.Auth
{
    
    public class auth_omgrk
    {
        [Key]
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }

    }
}
