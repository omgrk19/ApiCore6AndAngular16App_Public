using AutoMapper;
using DataModels.FilterModels;
using DataModels.Models;
using Services.DTOs;

namespace WebApiCore6CustomAuth.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Department, DepartmentDTO>().ReverseMap();            
            CreateMap<Department,DepartmentInsertDTO>().ReverseMap();            
            CreateMap<Department, DepartmentUpdateDTO>().ReverseMap();

            CreateMap<Designation, DesignationDTO>().ReverseMap();            
            CreateMap<Designation, DesignationInsertDTO>().ReverseMap();            
            CreateMap<Designation, DesignationUpdateDTO>().ReverseMap();
            
            CreateMap<Employee, EmployeeDTO>().ReverseMap();            
            CreateMap<Employee, EmployeeInserteDTO>().ReverseMap();            
            CreateMap<Employee, EmployeeUpdateDTO>().ReverseMap();
        }
    }
}
