import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthActionState } from "./authActions.state";





export const selectAuthActionFeatureState = createFeatureSelector<IAuthActionState>('authActions');

export const selectAuthActionList = createSelector(
  selectAuthActionFeatureState,
  (state) => {
    return state.authActionList
  });

export const selectAuthActionDataLoading = createSelector(
  selectAuthActionFeatureState,
  state => state.loading
);
export const selectAuthActionDataLoaded = createSelector(
  selectAuthActionFeatureState,
  state => state.loaded
);





