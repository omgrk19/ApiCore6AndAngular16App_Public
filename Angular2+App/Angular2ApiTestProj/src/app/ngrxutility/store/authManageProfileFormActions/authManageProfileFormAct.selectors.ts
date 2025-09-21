import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthManageProfileFormActState } from "./authManageProfileFormAct.state";







export const selectAuthManageProfileFormActFeatureState = createFeatureSelector<IAuthManageProfileFormActState>('authManageProfileFormActs');

export const selectAuthManageProfileFormActList = createSelector(
  selectAuthManageProfileFormActFeatureState,
  (state) => {
    return state.authManageProfileFormActList
  });

export const selectAuthManageProfileFormActDataLoading = createSelector(
  selectAuthManageProfileFormActFeatureState,
  state => state.loading
);
export const selectAuthManageProfileFormActDataLoaded = createSelector(
  selectAuthManageProfileFormActFeatureState,
  state => state.loaded
);
export const selectAuthManageProfileFormActFormId = createSelector(
  selectAuthManageProfileFormActFeatureState,
  state => state.fltFormId
);
export const selectAuthManageProfileFormActActionId = createSelector(
  selectAuthManageProfileFormActFeatureState,
  state => state.fltActionId
);
export const selectAuthManageProfileFormActProfileId = createSelector(
  selectAuthManageProfileFormActFeatureState,
  state => state.fltProfileId
);
export const selectAuthManageProfileFormActAdd = createSelector(
  selectAuthManageProfileFormActFeatureState,
  state => state.fltProfileId
);





