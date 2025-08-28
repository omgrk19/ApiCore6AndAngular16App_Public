import { IAuthManageFormAction } from "src/app/models/employee.models";

export interface IAuthManageFormActionState {  
  authManageFormActionList: IAuthManageFormAction[];
  fltId: number;
  fltFormId: string;
  fltActionId: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

