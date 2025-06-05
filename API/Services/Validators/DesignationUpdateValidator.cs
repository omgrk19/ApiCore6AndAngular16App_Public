using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Services.DTOs;

namespace Services.Validators
{
    public class DesignationUpdateValidator : AbstractValidator<DesignationUpdateDTO>
    {
        public DesignationUpdateValidator()
        {
            RuleFor(x => x.Id).NotEmpty().NotNull().NotEqual(0);        
            RuleFor(x => x.DesignationName).NotEmpty().NotNull().NotEqual("null").MaximumLength(50);            

        }
    }
}
