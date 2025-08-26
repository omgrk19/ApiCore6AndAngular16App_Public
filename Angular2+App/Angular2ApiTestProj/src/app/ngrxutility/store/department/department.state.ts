import { IDepartment } from "src/app/models/employee.models";

export interface IDepartmentState {  
  departments: IDepartment[];  
  fltId: number;
  fltDepartmentName: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

