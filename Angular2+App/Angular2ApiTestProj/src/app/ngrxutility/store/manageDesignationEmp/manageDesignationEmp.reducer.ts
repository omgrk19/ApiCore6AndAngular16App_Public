import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as ManageDesignationEmpActions from '../manageDesignationEmp/manageDesignationEmp.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IManageDesignationEmpState } from './manageDesignationEmp.state';




export const initialState: IManageDesignationEmpState = {
  ManageDesignationList: [],
  fltId: 0,
  fltDeptId: 0,
  fltDesigId: 0,
  loading: false,
  loaded: false,
  error: '',
};


export const manageDesignationEmpReducer = createReducer(
  initialState,
  on(ManageDesignationEmpActions.loadManageDesignationEmpRequest, (state, { dataLoaded, dataLoading, id, departmentId, designationId }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(ManageDesignationEmpActions.loadManageDesignationEmpSuccess, (state, { desigList, id, departmentId, designationId }) => ({
    ...state,
    ManageDesignationList: desigList,
    fltId: id ?? 0,
    fltDeptId: departmentId ?? 0,
    fltDesigId: designationId ?? 0,
    loading: false,
    loaded: true,
    error: ''
  })),
  on(ManageDesignationEmpActions.loadManageDesignationEmpFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    designationmanages: [],
    error: action.errorText
  }))
);
