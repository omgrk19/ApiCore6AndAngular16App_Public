import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as AuthManageFormActionActions from './authManageFormActions.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IAuthManageFormActionState } from './authManageFormActions.state';



export const initialState: IAuthManageFormActionState = {
  authManageFormActionList: [],
  fltId: 0,
  fltFormId: '',
  fltActionId: '',
  loading: false,
  loaded: false,
  error: '',
};


export const authManageFormActionReducer = createReducer(
  initialState,
  on(AuthManageFormActionActions.loadAuthManageFormActionRequest, (state, { dataLoaded, dataLoading, id, formId, actionId }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(AuthManageFormActionActions.loadAuthManageFormActionSuccess, (state, { authManageFormActionList, formId, actionId }) => ({
    ...state,
    authManageFormActionList: authManageFormActionList,
    loading: false,
    loaded: true,
    fltFormId: formId ?? '',
    fltActionId: actionId ?? '',
    error: ''
  })),
  on(AuthManageFormActionActions.loadAuthManageFormActionFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    authManageFormActionList: [],
    error: action.errorText
  }))
);
