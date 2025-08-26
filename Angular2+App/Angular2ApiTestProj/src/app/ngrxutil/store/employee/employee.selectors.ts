import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "./employee.state";



export const selectEmployeeFeatureState = createFeatureSelector<EmployeeState>('employees');

export const selectEmployees = createSelector(
  selectEmployeeFeatureState,
  (state) => {
    return state.employeeDetails_List
  });

export const selectEmployeesInfo = createSelector(
  selectEmployeeFeatureState,
  (state) => {
    return state
  });

export const selectLoading = createSelector(
  selectEmployeeFeatureState,
  state => state.loading
);
export const selectLoaded = createSelector(
  selectEmployeeFeatureState,
  state => state.loaded
);

// export const selectTotal = createSelector(
//   selectEmployeeFeatureState,
//   state => state.total
// );

// export const selectPage = createSelector(
//   selectEmployeeFeatureState,
//   state => state.page
// );

// export const selectLimit = createSelector(
//   selectEmployeeFeatureState,
//   state => state.limit
// );

// export const selectLoading = createSelector(
//   selectEmployeeFeatureState,
//   state => state.loading
// );