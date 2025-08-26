import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IDepartmentState } from "./department.state";





export const selectDepartmentFeatureState = createFeatureSelector<IDepartmentState>('departments');

export const selectDepartmentList = createSelector(
  selectDepartmentFeatureState,
  (state) => {
    return state.departments
  });

export const selectDepartmentDataLoading = createSelector(
  selectDepartmentFeatureState,
  state => state.loading
);
export const selectDepartmentDataLoaded = createSelector(
  selectDepartmentFeatureState,
  state => state.loaded
);


export const selectDepartmentName = createSelector(
  selectDepartmentFeatureState,
  state => state.fltDepartmentName
);

export const selectDepartmentId = createSelector(
  selectDepartmentFeatureState,
  state => state.fltId
);



