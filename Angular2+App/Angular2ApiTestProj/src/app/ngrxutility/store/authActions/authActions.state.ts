import { IAuthAction, IAuthForms } from "src/app/models/employee.models";

export interface IAuthActionState {  
  authActionList: IAuthAction[];
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

