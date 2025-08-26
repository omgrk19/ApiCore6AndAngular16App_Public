import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as DesignationActions from '../designation/designation.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IDesignationState } from './designation.state';



export const initialState: IDesignationState = {
  designations: [],
  fltId: 0,
  fltDesignationName: '',
  loading: false,
  loaded: false,
  error: '',
};


export const designationReducer = createReducer(
  initialState,
  on(DesignationActions.loadDesignationRequest, (state, { dataLoaded, dataLoading, id, designationName }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(DesignationActions.loadDesignationSuccess, (state, { deptList, id, designationName }) => ({
    ...state,
    designations: deptList,
    id: id ?? 0,
    designationName: designationName ?? '',
    loading: false,
    loaded: true,
    error: ''
  })),
  on(DesignationActions.loadDesignationFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    designations: [],
    error: action.errorText
  }))
);
