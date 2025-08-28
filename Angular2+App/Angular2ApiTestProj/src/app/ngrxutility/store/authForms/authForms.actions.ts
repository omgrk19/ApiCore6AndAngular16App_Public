import { createAction, props } from "@ngrx/store";
import { IAuthForms } from "src/app/models/employee.models";




export const typeLoadAuthFormsRequest = '[AuthForms] Load AuthForms Request';
export const typeLoadAuthFormsSuccess = '[AuthForms] Load AuthForms Success';
export const typeLoadAuthFormsFailure = '[AuthForms] Load AuthForms Failure';

export const loadAuthFormsRequest = createAction(
  typeLoadAuthFormsRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean }>()
);

export const loadAuthFormsSuccess = createAction(
  typeLoadAuthFormsSuccess,
  props<{ authFormsList: IAuthForms[] }>()
);

export const loadAuthFormsFailure = createAction(
  typeLoadAuthFormsFailure,
  props<{ errorText: string }>()
);