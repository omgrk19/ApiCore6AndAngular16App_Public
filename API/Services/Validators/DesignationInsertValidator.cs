using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Services.DTOs;

namespace Services.Validators
{
    public class DesignationInsertValidator : AbstractValidator<DesignationInsertDTO>
    {
        public DesignationInsertValidator()
        {                       
            RuleFor(x => x.DesignationName).NotEmpty().NotNull().NotEqual("null").MaximumLength(50);           
        }
    }
}
