﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.FilterModels
{
    public class DesignationFilter : PagingModel
    {
        public int? Id { get; set; }
        public string? DesignationName { get; set; }
    }
    
}
