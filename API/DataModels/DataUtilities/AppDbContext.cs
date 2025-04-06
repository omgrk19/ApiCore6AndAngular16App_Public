using DataModels.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DataModels.Models;


namespace DataModels.DataUtilities
{

    //public class AppDbContext : IdentityDbContext<ApplicationUser>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Employee>().HasData(
            //    new Employee
            //    {
            //        UserId = 1,
            //        BirthDate = DateTime.Now,
            //        CreateOn = DateTime.Now,
            //        DesignationId = 1,
            //        EmailId = "rakesh@gmail.com",
            //        FirstName = "Rakesh",
            //        LastName = "Kumar",
            //        IsActive = true,
            //        IsMaleorFemale = true,
            //        ModifieldOn = DateTime.Now,
            //        Password = "123"
            //    },
            //    new Employee
            //    {
            //        UserId = 2,
            //        BirthDate = DateTime.Now,
            //        CreateOn = DateTime.Now,
            //        DesignationId = 1,
            //        EmailId = "brajesh@gmail.com",
            //        FirstName = "Brajesh",
            //        LastName = "Kumar",
            //        IsActive = true,
            //        IsMaleorFemale = true,
            //        ModifieldOn = DateTime.Now,
            //        Password = "123"
            //    }
            //);

            modelBuilder.Entity<Designation>().HasData(
                //new Designation
                //{
                //    Id = 1,
                //    DesignationName = "Admin"
                //},
                //new Designation
                //{
                //    Id = 2,
                //    DesignationName = "Accountant"
                //},
                //new Designation
                //{
                //    Id = 3,
                //    DesignationName = "Management"
                //},
                
            );
        }


        #region authecative models
        public virtual DbSet<auth_user> auth_user { get; set; }
        public virtual DbSet<auth_profile_mas> auth_profile_mas { get; set; }
        public virtual DbSet<auth_profile_form_action> auth_profile_form_action { get; set; }
        public virtual DbSet<auth_user_profile> auth_user_profile { get; set; }
        public virtual DbSet<auth_user_profile_action> auth_user_profile_action { get; set; }
        public virtual DbSet<auth_action> auth_action { get; set; }
        public virtual DbSet<auth_form_mas> auth_form_mas { get; set; }
        public virtual DbSet<auth_form_mas_action> auth_form_mas_action { get; set; }
        #endregion

        
        public DbSet<Employee> Employee { get; set; }
        public DbSet<usp_EmployeeDetails> usp_EmployeeDetails { get; set; }
        public DbSet<Designation> Designation { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<ManageDesignation> ManageDesig { get; set; }
    }
}
