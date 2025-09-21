import { createAction, props } from "@ngrx/store";
import { IDesignation } from "src/app/models/employee.models";




export const typeLoadDesignationRequest = '[Designation] Load Designation Request';
export const typeLoadDesignationSuccess = '[Designation] Load Designation Success';
export const typeLoadDesignationFailure = '[Designation] Load Designation Failure';
export const typeAddDesignation = '[Designation] Add Designation';
export const typeUpdateDesignation = '[Designation] Update Designation';
export const typeDeleteDesignation = '[Designation] Delete Designation';

export const loadDesignationRequest = createAction(
  typeLoadDesignationRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean, id?: number, designationName?: string }>()
);

export const loadDesignationSuccess = createAction(
  typeLoadDesignationSuccess,
  props<{ deptList: IDesignation[], id?: number, designationName?: string }>()
  // props<{ empResponse: IEmployeeState  }>()
  // props<{ empList: tEmployee[]  }>()
);

export const loadDesignationFailure = createAction(
  typeLoadDesignationFailure,
  props<{ errorText: string }>()
);


export const addDesignation = createAction(
  typeAddDesignation,
  props<{ designation: IDesignation }>()
);
export const updateDesignation = createAction(
  typeUpdateDesignation,
  props<{ designation: IDesignation }>()
);
export const deleteDesignation = createAction(
  typeDeleteDesignation,
  props<{ id: number }>()
);