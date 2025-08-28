import { IAuthManageProfileFormAct } from "src/app/models/employee.models";

export interface IAuthManageProfileFormActState {  
  authManageProfileFormActList: IAuthManageProfileFormAct[];
  fltId: number;
  fltFormId: string;
  fltActionId: string;
  fltProfileId: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

