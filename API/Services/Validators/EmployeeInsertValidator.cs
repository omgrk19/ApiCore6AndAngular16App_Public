using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Services.DTOs;

namespace Services.Validators
{
    public class EmployeeInsertValidator : AbstractValidator<EmployeeInserteDTO>
    {
        public EmployeeInsertValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().NotNull().NotEqual("null").MaximumLength(50);
            RuleFor(x => x.DepartmentId).NotEmpty().NotNull().NotEqual(0);
            RuleFor(x => x.DesignationId).NotEmpty().NotNull().NotEqual(0);

            RuleFor(x => x.Password)
           .NotEmpty()
           .MinimumLength(8)
           .Matches("[A-Z]").WithMessage("'{PropertyName}' must contain one or more capital letters.")
           .Matches("[a-z]").WithMessage("'{PropertyName}' must contain one or more lowercase letters.")
           .Matches(@"\d").WithMessage("'{PropertyName}' must contain one or more digits.")
           .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("'{ PropertyName}' must contain one or more special characters.")
           .Matches("^[^£# “”]*$").WithMessage("'{PropertyName}' must not contain the following characters £ # “” or spaces.");
            //.Must(pass => !blacklistedWords.Any(word => pass.IndexOf(word, StringComparison.OrdinalIgnoreCase) >= 0))
            //    .WithMessage("'{PropertyName}' contains a word that is not allowed.");

            When(x => x.EmailId.Length > 0, () =>
            {
                RuleFor(x => x.EmailId).Matches("^\\S+@\\S+\\.\\S+$");
            });

            When(x => x.Mobile.Length > 0, () =>
            {
                RuleFor(x => x.Mobile).MinimumLength(10).MaximumLength(10).Matches("^\\d+$");
            });
        }
    }
}
