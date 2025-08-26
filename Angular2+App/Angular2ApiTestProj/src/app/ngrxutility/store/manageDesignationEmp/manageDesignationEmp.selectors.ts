import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IManageDesignationEmpState } from "./manageDesignationEmp.state";


export const selectManageDesignationEmpFeatureState = createFeatureSelector<IManageDesignationEmpState>('manageDesignationEmps');

export const selectManageDesignationEmpList = createSelector(
  selectManageDesignationEmpFeatureState,
  (state) => {
    return state.ManageDesignationList;
  });

export const selectManageDesignationEmpDataLoading = createSelector(
  selectManageDesignationEmpFeatureState,
  state => state.loading
);
export const selectManageDesignationEmpDataLoaded = createSelector(
  selectManageDesignationEmpFeatureState,
  state => state.loaded
);

export const selectManageDesignationEmpId = createSelector(
  selectManageDesignationEmpFeatureState,
  state => state.fltId
);

export const selectManageDesignationEmpDeptId = createSelector(
  selectManageDesignationEmpFeatureState,
  state => state.fltDeptId
);

export const selectManageDesignationEmpDesigId = createSelector(
  selectManageDesignationEmpFeatureState,
  state => state.fltDesigId
);




