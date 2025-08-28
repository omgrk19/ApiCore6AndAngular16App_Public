import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthManageFormActionState } from "./authManageFormActions.state";






export const selectAuthManageFormActionFeatureState = createFeatureSelector<IAuthManageFormActionState>('authManageFormActions');

export const selectAuthManageFormActionList = createSelector(
  selectAuthManageFormActionFeatureState,
  (state) => {
    return state.authManageFormActionList
  });

export const selectAuthManageFormActionDataLoading = createSelector(
  selectAuthManageFormActionFeatureState,
  state => state.loading
);
export const selectAuthManageFormActionDataLoaded = createSelector(
  selectAuthManageFormActionFeatureState,
  state => state.loaded
);
export const selectAuthManageFormActionFormId = createSelector(
  selectAuthManageFormActionFeatureState,
  state => state.fltFormId
);
export const selectAuthManageFormActionActionId = createSelector(
  selectAuthManageFormActionFeatureState,
  state => state.fltActionId
);





