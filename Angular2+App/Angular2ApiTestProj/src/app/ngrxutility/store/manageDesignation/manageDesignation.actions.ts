import { createAction, props } from "@ngrx/store";
import { IManageDesignation } from "src/app/models/employee.models";




export const typeLoadManageDesignationRequest = '[ManageDesignation] Load ManageDesignation Request';
export const typeLoadManageDesignationSuccess = '[ManageDesignation] Load ManageDesignation Success';
export const typeLoadManageDesignationFailure = '[ManageDesignation] Load ManageDesignation Failure';
export const typeLoadManageDesignationAdd = '[ManageDesignation] Load ManageDesignation Add';
export const typeLoadManageDesignationDelete = '[ManageDesignation] Load ManageDesignation Delete';

export const loadManageDesignationRequest = createAction(
  typeLoadManageDesignationRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean, id?: number, departmentId?: number, designationId?: number }>()
);

export const loadManageDesignationSuccess = createAction(
  typeLoadManageDesignationSuccess,
  props<{ desigList: IManageDesignation[], id?: number, departmentId?: number, designationId?: number }>()
  // props<{ empResponse: IEmployeeState  }>()
  // props<{ empList: tEmployee[]  }>()
);

export const loadManageDesignationFailure = createAction(
  typeLoadManageDesignationFailure,
  props<{ errorText: string }>()
);

export const addManageDesignation = createAction(
  typeLoadManageDesignationAdd,
  props<{ manageDesignation: IManageDesignation }>()
);

export const deleteManageDesignation = createAction(
  typeLoadManageDesignationDelete,
  props<{ id: number }>()
);