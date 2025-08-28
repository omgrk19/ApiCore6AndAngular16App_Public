import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as AuthActionActions from './authActions.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IAuthActionState } from './authActions.state';



export const initialState: IAuthActionState = {
  authActionList: [],
  loading: false,
  loaded: false,
  error: '',
};


export const authActionReducer = createReducer(
  initialState,
  on(AuthActionActions.loadAuthActionRequest, (state, { dataLoaded, dataLoading }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(AuthActionActions.loadAuthActionSuccess, (state, { authActionList }) => ({
    ...state,
    authActionList: authActionList,
    loading: false,
    loaded: true,
    error: ''
  })),
  on(AuthActionActions.loadAuthActionFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    authActionList: [],
    error: action.errorText
  }))
);
