import { IEmployee } from "src/app/models/employee.models";

export interface IEmployeeState {  
  employeeDetails_List: IEmployee[];
  totalRecords: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  id?: number;
  departmentId?: number;
  designationId?: number;
  firstName?: string;
  mobile?: string;  
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

