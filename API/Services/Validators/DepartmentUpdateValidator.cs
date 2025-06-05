using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Services.DTOs;

namespace Services.Validators
{
    public class DepartmentUpdateValidator : AbstractValidator<DepartmentUpdateDTO>
    {
        public DepartmentUpdateValidator()
        {
            RuleFor(x => x.Id).NotEmpty().NotNull().NotEqual(0);        
            RuleFor(x => x.DepartmentName).NotEmpty().NotNull().NotEqual("null").MaximumLength(50);            

        }
    }
}
