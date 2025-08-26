import { createAction, props } from "@ngrx/store";
import { IDepartmentState } from "./department.state";
import { IDepartment } from "src/app/models/employee.models";



export const typeLoadDepartmentRequest = '[Department] Load Department Request';
export const typeLoadDepartmentSuccess = '[Department] Load Department Success';
export const typeLoadDepartmentFailure = '[Department] Load Department Failure';

export const loadDepartmentRequest = createAction(
  typeLoadDepartmentRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean, id?: number, departmentName?: string }>()
);

export const loadDepartmentSuccess = createAction(
  typeLoadDepartmentSuccess,
  props<{ deptList: IDepartment[], id?: number, departmentName?: string }>()
  // props<{ empResponse: IEmployeeState  }>()
  // props<{ empList: tEmployee[]  }>()
);

export const loadDepartmentFailure = createAction(
  typeLoadDepartmentFailure,
  props<{ errorText: string }>()
);