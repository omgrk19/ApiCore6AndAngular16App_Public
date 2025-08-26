import { createAction, props } from "@ngrx/store";
import { IEmployeeState } from "./employee.state";


export const typeLoadEmployeesRequest = '[Employee] Load Employees Request';
export const typeLoadEmployeesSuccess = '[Employee] Load Employees Success';
export const typeLoadEmployeesFailure = '[Employee] Load Employees Failure';

export const loadEmployeesRequest = createAction(
  typeLoadEmployeesRequest,
  props<{
    dataLoaded: boolean, dataLoading: boolean, page: number; limit: number,
    id: any, departmentId: any, designationId: any, firstName: any, mobile: any
  }>()
);

export const loadEmployeesSuccess = createAction(
  typeLoadEmployeesSuccess,
  props<{
    empResponse: IEmployeeState, page: number; limit: number,
    id: any, departmentId: any, designationId: any, firstName: any, mobile: any
  }>()
  // props<{ empResponse: IEmployeeState  }>()
  // props<{ empList: tEmployee[]  }>()
);

export const loadEmployeesFailure = createAction(
  typeLoadEmployeesFailure,
  props<{ errorText: string }>()
);