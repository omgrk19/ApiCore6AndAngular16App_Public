import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from '../employee/employee.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IEmployeeState } from './employee.state';



export const initialState: IEmployeeState = {
  employeeDetails_List: [],
  totalRecords: 0,
  pageNo: 0,
  pageSize: 10,
  totalPages: 0,
  id: 0,
  departmentId: 0,
  designationId: 0,
  firstName: '',
  mobile: '',
  loading: false,
  loaded: false,
  error: '',
};


export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployeesRequest, (state, { dataLoaded, dataLoading, page, limit, id, departmentId, designationId, firstName, mobile }) => ({
    ...state,
    loading: dataLoading,
    loaded: dataLoaded,
    // page,
    // limit,
    //id,
    // departmentId,
    // designationId,
    // firstName,
    // mobile,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(EmployeeActions.loadEmployeesSuccess, (state, { empResponse, page, limit, id, departmentId, designationId, firstName, mobile }) => ({
    ...state,
    // //employees: empResponse.employeeDetails_List,
    // // employees.empList: action.empList,    
    // employeeDetails_List: action.empResponse.employeeDetails_List,
    // totalRecords: action.empResponse.totalRecords,
    // pageNo: action.empResponse.pageNo,
    // pageSize: action.empResponse.pageSize,
    // totalPages: Math.floor(action.empResponse.totalRecords / action.empResponse.pageSize),
    // departmentId: state.departmentId,
    employeeDetails_List: empResponse.employeeDetails_List,
    totalRecords: empResponse.totalRecords,
    pageNo: page,
    pageSize: limit,
    totalPages: Math.floor(empResponse.totalRecords / empResponse.pageSize),

    departmentId: departmentId,
    designationId: designationId,
    firstName: firstName,
    mobile: mobile,
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
