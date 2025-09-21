import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as AuthManageProfileFormActActions from './authManageProfileFormAct.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IAuthManageProfileFormActState } from './authManageProfileFormAct.state';




export const initialState: IAuthManageProfileFormActState = {
  authManageProfileFormActList: [],
  fltId: 0,
  fltFormId: '',
  fltActionId: '',
  fltProfileId: '',
  loading: false,
  loaded: false,
  error: '',
};


export const authManageProfileFormActReducer = createReducer(
  initialState,
  on(AuthManageProfileFormActActions.loadAuthManageProfileFormActRequest, (state, { dataLoaded, dataLoading, id, profileId, formId, actionId }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(AuthManageProfileFormActActions.loadAuthManageProfileFormActSuccess, (state, { authManageProfileFormActList, profileId, formId, actionId }) => ({
    ...state,
    authManageProfileFormActList: authManageProfileFormActList,
    loading: false,
    loaded: true,
    fltProfileId: profileId ?? '',
    fltFormId: formId ?? '',
    fltActionId: actionId ?? '',
    error: ''
  })),
  on(AuthManageProfileFormActActions.loadAuthManageProfileFormActFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    authManageProfileFormActList: [],
    error: action.errorText
  })),
  on(AuthManageProfileFormActActions.addAuthManageProfileFormAct, (state, { authManageProfileFormAct }) => ({
      ...state,
      //departments: [...state.departments, department],    //added at the end
      authManageProfileFormActList: [authManageProfileFormAct, ...state.authManageProfileFormActList],  //added at the beginning
    })),    
    on(AuthManageProfileFormActActions.deleteAuthManageProfileFormAct, (state, { id }) => ({
      ...state,
      authManageProfileFormActList: state.authManageProfileFormActList.filter(x => x.id !== id)
    })),
);
