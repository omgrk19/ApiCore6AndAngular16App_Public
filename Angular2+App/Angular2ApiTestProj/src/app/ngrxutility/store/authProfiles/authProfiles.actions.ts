import { createAction, props } from "@ngrx/store";
import { IAuthProfile } from "src/app/models/employee.models";




export const typeLoadAuthProfilesRequest = '[AuthProfiles] Load AuthProfiles Request';
export const typeLoadAuthProfilesSuccess = '[AuthProfiles] Load AuthProfiles Success';
export const typeLoadAuthProfilesFailure = '[AuthProfiles] Load AuthProfiles Failure';

export const loadAuthProfilesRequest = createAction(
  typeLoadAuthProfilesRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean }>()
);

export const loadAuthProfilesSuccess = createAction(
  typeLoadAuthProfilesSuccess,
  props<{ authProfileList: IAuthProfile[] }>()
);

export const loadAuthProfilesFailure = createAction(
  typeLoadAuthProfilesFailure,
  props<{ errorText: string }>()
);