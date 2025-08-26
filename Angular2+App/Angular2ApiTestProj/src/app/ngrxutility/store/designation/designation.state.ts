import { IDesignation } from "src/app/models/employee.models";

export interface IDesignationState {  
  designations: IDesignation[];  
  fltId: number;
  fltDesignationName: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}
 

