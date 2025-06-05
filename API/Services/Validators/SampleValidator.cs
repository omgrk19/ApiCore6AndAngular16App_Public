using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Services.DTOs;

namespace Services.Validators
{
    public class SampleValidator : AbstractValidator<DepartmentUpdateDTO>
    {
        public SampleValidator()
        {
            //RuleFor(x => x.DepartmentName).NotEmpty().NotNull().NotEqual("null").MaximumLength(50);
            //correct//RuleFor(x => x.DepartmentName).NotEmpty().WithMessage("Please enter the confirmation password").NotNull().NotEqual("null").WithMessage("Please enter the confirmation password");
            //correct//RuleFor(x => x.DepartmentName).NotEmpty().WithMessage("Please enter the confirmation password").NotNull().WithMessage("Please enter the confirmation password null").NotEqual("null").WithMessage("Please enter the confirmation password 123");

            //RuleFor(x => x.Id).NotEmpty().NotNull().NotEqual(0);   

            //When(x => x.DepartmentName.Length < 5, () =>
            //{
            //    RuleFor(y => y.DepartmentName)
            //    .Custom((z, context) =>
            //    {
            //        context.AddFailure($"Length must be minimum 5 update");
            //    });
            //});

        }
    }
}
