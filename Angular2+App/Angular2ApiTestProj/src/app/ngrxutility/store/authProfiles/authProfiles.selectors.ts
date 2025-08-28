import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthProfileState } from "./authProfiles.state";





export const selectAuthProfilesFeatureState = createFeatureSelector<IAuthProfileState>('authProfiles');

export const selectAuthProfilesList = createSelector(
  selectAuthProfilesFeatureState,
  (state) => {
    return state.authProfileList
  });

export const selectAuthProfilesDataLoading = createSelector(
  selectAuthProfilesFeatureState,
  state => state.loading
);
export const selectAuthProfilesDataLoaded = createSelector(
  selectAuthProfilesFeatureState,
  state => state.loaded
);





