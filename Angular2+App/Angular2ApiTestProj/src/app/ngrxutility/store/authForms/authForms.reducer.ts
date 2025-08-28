import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as AuthFormsActions from './authForms.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IAuthFormsState } from './authForms.state';



export const initialState: IAuthFormsState = {
  authFormsList: [],
  loading: false,
  loaded: false,
  error: '',
};


export const authFormsReducer = createReducer(
  initialState,
  on(AuthFormsActions.loadAuthFormsRequest, (state, { dataLoaded, dataLoading }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(AuthFormsActions.loadAuthFormsSuccess, (state, { authFormsList }) => ({
    ...state,
    authFormsList: authFormsList,
    loading: false,
    loaded: true,
    error: ''
  })),
  on(AuthFormsActions.loadAuthFormsFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    authFormsList: [],
    error: action.errorText
  }))
);
