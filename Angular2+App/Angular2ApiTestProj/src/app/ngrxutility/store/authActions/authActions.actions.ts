import { createAction, props } from "@ngrx/store";
import { IAuthAction } from "src/app/models/employee.models";




export const typeLoadAuthActionRequest = '[AuthAction] Load AuthAction Request';
export const typeLoadAuthActionSuccess = '[AuthAction] Load AuthAction Success';
export const typeLoadAuthActionFailure = '[AuthAction] Load AuthAction Failure';

export const loadAuthActionRequest = createAction(
  typeLoadAuthActionRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean }>()
);

export const loadAuthActionSuccess = createAction(
  typeLoadAuthActionSuccess,
  props<{ authActionList: IAuthAction[] }>()
);

export const loadAuthActionFailure = createAction(
  typeLoadAuthActionFailure,
  props<{ errorText: string }>()
);