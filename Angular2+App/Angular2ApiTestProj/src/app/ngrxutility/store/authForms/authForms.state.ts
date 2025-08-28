import { IAuthForms } from "src/app/models/employee.models";

export interface IAuthFormsState {  
  authFormsList: IAuthForms[];
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

