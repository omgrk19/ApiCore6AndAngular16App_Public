using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Services.DTOs;

namespace Services.Validators
{
    public class DepartmentInsertValidator : AbstractValidator<DepartmentInsertDTO>
    {
        public DepartmentInsertValidator()
        {                       
            RuleFor(x => x.DepartmentName).NotEmpty().NotNull().NotEqual("null").MaximumLength(50);           
        }
    }
}
