import { createAction, props } from "@ngrx/store";
import { IManageDesignation } from "src/app/models/employee.models";




export const typeLoadManageDesignationEmpRequest = '[ManageDesignationEmp] Load ManageDesignationEmp Request';
export const typeLoadManageDesignationEmpSuccess = '[ManageDesignationEmp] Load ManageDesignationEmp Success';
export const typeLoadManageDesignationEmpFailure = '[ManageDesignationEmp] Load ManageDesignationEmp Failure';

export const loadManageDesignationEmpRequest = createAction(
  typeLoadManageDesignationEmpRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean, id?: number, departmentId?: number, designationId?: number }>()
);

export const loadManageDesignationEmpSuccess = createAction(
  typeLoadManageDesignationEmpSuccess,
  props<{ desigList: IManageDesignation[], id?: number, departmentId?: number, designationId?: number }>()
  // props<{ empResponse: IEmployeeState  }>()
  // props<{ empList: tEmployee[]  }>()
);

export const loadManageDesignationEmpFailure = createAction(
  typeLoadManageDesignationEmpFailure,
  props<{ errorText: string }>()
);