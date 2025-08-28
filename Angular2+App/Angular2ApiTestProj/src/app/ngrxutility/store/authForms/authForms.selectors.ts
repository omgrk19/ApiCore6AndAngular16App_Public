import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthFormsState } from "./authForms.state";





export const selectAuthFormsFeatureState = createFeatureSelector<IAuthFormsState>('authForms');

export const selectAuthFormsList = createSelector(
  selectAuthFormsFeatureState,
  (state) => {
    return state.authFormsList
  });

export const selectAuthFormsDataLoading = createSelector(
  selectAuthFormsFeatureState,
  state => state.loading
);
export const selectAuthFormsDataLoaded = createSelector(
  selectAuthFormsFeatureState,
  state => state.loaded
);





