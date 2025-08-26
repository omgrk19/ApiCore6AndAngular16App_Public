import { tEmployee } from "../models/t-employee.models";

export interface EmployeeState {  
  employeeDetails_List: tEmployee[];
  totalRecords: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  loading: boolean;
  loaded: boolean;
  error: string;
}

