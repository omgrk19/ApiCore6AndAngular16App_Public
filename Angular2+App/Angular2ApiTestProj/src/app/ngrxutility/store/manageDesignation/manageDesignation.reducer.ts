import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as ManageDesignationActions from '../manageDesignation/manageDesignation.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IManageDesignationState } from './manageDesignation.state';




export const initialState: IManageDesignationState = {
  ManageDesignationList: [],
  fltId: 0,
  fltDeptId: 0,
  fltDesigId: 0,
  loading: false,
  loaded: false,
  error: '',
};


export const manageDesignationReducer = createReducer(
  initialState,
  on(ManageDesignationActions.loadManageDesignationRequest, (state, { dataLoaded, dataLoading, id, departmentId, designationId }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(ManageDesignationActions.loadManageDesignationSuccess, (state, { desigList, id, departmentId, designationId }) => ({
    ...state,
    ManageDesignationList: desigList,
    fltId: id ?? 0,
    fltDeptId: departmentId ?? 0,
    fltDesigId: designationId ?? 0,
    loading: false,
    loaded: true,
    error: ''
  })),
  on(ManageDesignationActions.loadManageDesignationFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    designationmanages: [],
    error: action.errorText
  }))
);
