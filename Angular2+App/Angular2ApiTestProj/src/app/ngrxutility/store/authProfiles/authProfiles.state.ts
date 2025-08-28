import { IAuthProfile } from "src/app/models/employee.models";

export interface IAuthProfileState {  
  authProfileList: IAuthProfile[];
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

