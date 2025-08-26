import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from '../employee/employee.actions';
// import { tEmployee } from '../models/employee.models';
import { tEmployee } from '../models/t-employee.models';
import { EmployeeState } from './employee.state';
import { act } from '@ngrx/effects';


export const initialState: EmployeeState = {
  employeeDetails_List: [],
  totalRecords: 0,
  pageNo: 1,
  pageSize: 10,
  totalPages: 0,
  loading: false,
  loaded: false,
  error: '',
};


export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployeesRequest, (state, { page, limit }) => ({
    ...state,
    loading: true,
    page,
    limit,
    error: ''
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
    ...state,
    //employees: empResponse.employeeDetails_List,
    // employees.empList: action.empList,    
    employeeDetails_List: action.empResponse.employeeDetails_List,
    totalRecords: action.empResponse.totalRecords,
    pageNo: action.empResponse.pageNo,
    pageSize: action.empResponse.pageSize,
    totalPages: Math.floor(action.empResponse.totalRecords / action.empResponse.pageSize),
    loading: false,
    loaded: true,
    error: ''
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    employeeDetails_List: [],    
    error: action.errorText
  }))
);
