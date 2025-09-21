import { createReducer, on } from '@ngrx/store';
// import * as EmployeeActions from '../employee/employee.actions';
import * as DepartmentActions from '../department/department.actions';
// import { tEmployee } from '../models/employee.models';
import { act } from '@ngrx/effects';
import { IDepartmentState } from './department.state';



export const initialState: IDepartmentState = {
  departments: [],
  fltId: 0,
  fltDepartmentName: '',
  loading: false,
  loaded: false,
  error: '',
};


export const departmentReducer = createReducer(
  initialState,
  on(DepartmentActions.loadDepartmentRequest, (state, { dataLoaded, dataLoading, id, departmentName }) => ({
    ...state,
    // loading: true,
    loaded: dataLoaded,
    loading: dataLoading,
    error: ''
  })),
  // on(EmployeeActions.loadEmployeesSuccess, (state, action) => ({
  on(DepartmentActions.loadDepartmentSuccess, (state, { deptList, id, departmentName }) => ({
    ...state,
    departments: deptList,
    id: id ?? 0,
    departmentName: departmentName ?? '',
    loading: false,
    loaded: true,
    error: ''
  })),
  on(DepartmentActions.loadDepartmentFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    departments: [],
    error: action.errorText
  })),
  on(DepartmentActions.addDepartment, (state, { department }) => ({
    ...state,
    //departments: [...state.departments, department],    //added at the end
    departments: [department, ...state.departments],  //added at the beginning
  })),
  on(DepartmentActions.updateDepartment, (state, { department }) => ({
    ...state,
    departments: state.departments.map(dep => dep.id === department.id ? department : dep)
  })),
  on(DepartmentActions.deleteDepartment, (state, { id }) => ({
    ...state,
    departments: state.departments.filter(dep => dep.id !== id)
  })),
);
