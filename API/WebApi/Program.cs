using Microsoft.EntityFrameworkCore;
using DataModels.DataUtilities;
using WebApi.Controllers;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using DataModels.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Builder;
using DataModels.DataUtilities;
using Repositories.Repositories;
using Services.Services;
using Repositories.Repositories.Interfaces;
using Services.Services.Interfaces;
using WebApiCore6CustomAuth.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"));
});

#region Repo : RepoInterface
builder.Services.AddScoped<IEmployeeRepo, EmployeeRepo>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IDepartmentRepo, DepartmentRepo>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IDesignationRepo, DesignationRepo>();
builder.Services.AddScoped<IDesignationService, DesignationService>();
builder.Services.AddScoped<IAuthActionRepo, AuthActionRepo>();
builder.Services.AddScoped<IAuthActionService, AuthActionService>();
builder.Services.AddScoped<IAuthFormMasRepo, AuthFormMasRepo>();
builder.Services.AddScoped<IAuthFormMasService, AuthFormMasService>();
builder.Services.AddScoped<IAuthFormMasActionRepo, AuthFormMasActionRepo>();
builder.Services.AddScoped<IAuthFormMasActionService, AuthFormMasActionService>();
builder.Services.AddScoped<IAuthProfileFormActionRepo, AuthProfileFormActionRepo>();
builder.Services.AddScoped<IAuthProfileFormActionService, AuthProfileFormActionService>();
builder.Services.AddScoped<IAuthProfileMasRepo, AuthProfileMasRepo>();
builder.Services.AddScoped<IAuthProfileMasService, AuthProfileMasService>();
builder.Services.AddScoped<IAuthUserRepo, AuthUserRepo>();
builder.Services.AddScoped<IAuthUserService, AuthUserService>();
builder.Services.AddScoped<IManageDesignationRepo, ManageDesignationRepo>();
builder.Services.AddScoped<IManageDesignationService, ManageDesignationService>();
builder.Services.AddScoped<IUploadingFilesRepo, UploadingFilesRepo>();
builder.Services.AddScoped<IUploadingFilesService, UploadingFilesService>();
builder.Services.AddScoped<IAccountRepo, AccountRepo>();
builder.Services.AddScoped<IAccountService, AccountService>();

#endregion

builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Adding AWS Lambda
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

//Add cores 
//builder.Services.AddCors(x => x.AddPolicy("AllowSpecificOrigin", bb =>
builder.Services.AddCors(x => x.AddPolicy("corsapp", bb =>
{
    //bb.WithOrigins("*").AllowAnyOrigin().AllowAnyHeader();
    //bb.WithOrigins("http://localhost:4200/").AllowAnyOrigin().AllowAnyHeader();
    //bb.WithOrigins("http://localhost:4200/", "https://apiforangulartest.omss.in/", "https://apiforangulartest.omss.info/", "https://apiforangulartest.nppnp.com/").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    //bb.WithOrigins("http://localhost:4200/", "https://angulartest.omss.in/", "https://angulartest.omss.info/", "https://angulartest.nppnp.com/").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    bb.WithOrigins("https://angulartest.nppnp.com/").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
}));


//// For Identity
//builder.Services.AddIdentity<ApplicationUser, IdentityRole>(x =>
//{
//    x.Password.RequiredUniqueChars = 0;
//    x.Password.RequiredLength = 3;
//    x.Password.RequireNonAlphanumeric = false;
//    x.Password.RequireLowercase = false;
//    x.Password.RequireUppercase = false;
//    x.Password.RequireDigit = true;
//})
//    .AddEntityFrameworkStores<AppDbContext>()
//    .AddDefaultTokenProviders();

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
 // Adding Jwt Bearer
 .AddJwtBearer(options =>
 {
     options.SaveToken = true;
     options.RequireHttpsMetadata = false;
     options.TokenValidationParameters = new TokenValidationParameters()
     {
         ValidateIssuer = true,
         ValidateAudience = true,
         ValidAudience = builder.Configuration["JWT:ValidAudience"],
         ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
     };
 });


#region Swagger UI: Authentication passing
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
#endregion




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
}

app.UseSwagger();
app.UseSwaggerUI();

//use at a time one 
//app.UseMiddleware<CustomExceptionMiddleware>();//using custom middleware as 'CustomExceptionMiddleware' directaly 
//app.UseCustomExceptionMiddleware();//using custom middleware as 'CustomExceptionMiddleware' using extention method 'UseCustomExceptionMiddleware' of 'CustomExceptionMiddlewareExtensions' class


app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("corsapp");
//app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.Run();
