import { createAction, props } from "@ngrx/store";
import { tEmployee } from "../models/t-employee.models";
import { EmployeeState } from "./employee.state";

export const typeLoadEmployeesRequest = '[Employee] Load Employees Request';
export const typeLoadEmployeesSuccess = '[Employee] Load Employees Success';
export const typeLoadEmployeesFailure = '[Employee] Load Employees Failure';

export const loadEmployeesRequest = createAction(
  typeLoadEmployeesRequest,
  props<{ page: number; limit: number }>()
);

export const loadEmployeesSuccess = createAction(
  typeLoadEmployeesSuccess,
  props<{ empResponse: EmployeeState }>()
  // props<{ empList: tEmployee[]  }>()
);

export const loadEmployeesFailure = createAction(
  typeLoadEmployeesFailure,
  props<{ errorText: string }>()
);