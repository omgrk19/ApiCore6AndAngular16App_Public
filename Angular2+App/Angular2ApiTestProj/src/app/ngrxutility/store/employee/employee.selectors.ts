import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IEmployeeState } from "./employee.state";




export const selectEmployeeFeatureState = createFeatureSelector<IEmployeeState>('employees');

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

export const selectEmployeeDataLoading = createSelector(
  selectEmployeeFeatureState,
  state => state.loading
);
export const selectEmployeeDataLoaded = createSelector(
  selectEmployeeFeatureState,
  state => state.loaded
);

export const selectEmployeePageNo = createSelector(
  selectEmployeeFeatureState,
  state => state.pageNo
);

export const selectEmployeePageSize = createSelector(
  selectEmployeeFeatureState,
  state => state.pageSize
);

export const selectEmployeeDepartmentId = createSelector(
  selectEmployeeFeatureState,
  state => state.departmentId
);

export const selectEmployeeDesignationId = createSelector(
  selectEmployeeFeatureState,
  state => state.designationId
);

export const selectEmployeeFirstName = createSelector(
  selectEmployeeFeatureState,
  state => state.firstName
);

export const selectEmployeeMobile = createSelector(
  selectEmployeeFeatureState,
  state => state.mobile
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