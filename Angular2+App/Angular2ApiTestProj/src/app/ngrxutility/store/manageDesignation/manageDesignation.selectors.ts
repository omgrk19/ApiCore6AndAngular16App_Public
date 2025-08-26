import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IManageDesignationState } from "./manageDesignation.state";


export const selectManageDesignationFeatureState = createFeatureSelector<IManageDesignationState>('manageDesignations');

export const selectManageDesignationList = createSelector(
  selectManageDesignationFeatureState,
  (state) => {
    return state.ManageDesignationList;
  });

export const selectManageDesignationDataLoading = createSelector(
  selectManageDesignationFeatureState,
  state => state.loading
);
export const selectManageDesignationDataLoaded = createSelector(
  selectManageDesignationFeatureState,
  state => state.loaded
);

export const selectManageDesignationId = createSelector(
  selectManageDesignationFeatureState,
  state => state.fltId
);

export const selectManageDesignationDeptId = createSelector(
  selectManageDesignationFeatureState,
  state => state.fltDeptId
);

export const selectManageDesignationDesigId = createSelector(
  selectManageDesignationFeatureState,
  state => state.fltDesigId
);




