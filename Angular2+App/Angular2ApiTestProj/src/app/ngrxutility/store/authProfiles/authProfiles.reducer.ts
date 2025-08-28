import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as AuthProfilesActions from './authProfiles.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IAuthProfileState } from './authProfiles.state';



export const initialState: IAuthProfileState = {
  authProfileList: [],
  loading: false,
  loaded: false,
  error: '',
};


export const authProfilesReducer = createReducer(
  initialState,
  on(AuthProfilesActions.loadAuthProfilesRequest, (state, { dataLoaded, dataLoading }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(AuthProfilesActions.loadAuthProfilesSuccess, (state, { authProfileList }) => ({
    ...state,
    authProfileList: authProfileList,
    loading: false,
    loaded: true,
    error: ''
  })),
  on(AuthProfilesActions.loadAuthProfilesFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    authProfileList: [],
    error: action.errorText
  }))
);
