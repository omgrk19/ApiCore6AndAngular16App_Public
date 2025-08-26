import { IManageDesignation } from "src/app/models/employee.models";

export interface IManageDesignationEmpState {  
  ManageDesignationList: IManageDesignation[];  
  fltId: number;
  fltDeptId: number;
  fltDesigId: number;
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

