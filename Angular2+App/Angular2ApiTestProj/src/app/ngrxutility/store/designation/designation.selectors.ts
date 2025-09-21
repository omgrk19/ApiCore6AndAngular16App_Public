import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IDesignationState } from "./designation.state";





export const selectDesignationFeatureState = createFeatureSelector<IDesignationState>('designations');

export const selectDesignationList = createSelector(
  selectDesignationFeatureState,
  (state) => {
    return state.designations
  });

export const selectDesignationDataLoading = createSelector(
  selectDesignationFeatureState,
  state => state.loading
);
export const selectDesignationDataLoaded = createSelector(
  selectDesignationFeatureState,
  state => state.loaded
);


export const selectDesignationName = createSelector(
  selectDesignationFeatureState,
  state => state.fltDesignationName
);

export const selectDesignationId = createSelector(
  selectDesignationFeatureState,
  state => state.fltId
);

export const selectDesignationById = (id: number) => createSelector(
  selectDesignationList,
  (designations) => designations.find(desig => desig.id === id)
)


