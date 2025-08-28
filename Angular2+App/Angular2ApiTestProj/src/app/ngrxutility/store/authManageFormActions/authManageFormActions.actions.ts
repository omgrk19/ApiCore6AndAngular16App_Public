import { createAction, props } from "@ngrx/store";
import { IAuthManageFormAction } from "src/app/models/employee.models";




export const typeLoadAuthManageFormActionRequest = '[AuthManageFormAction] Load AuthManageFormAction Request';
export const typeLoadAuthManageFormActionSuccess = '[AuthManageFormAction] Load AuthManageFormAction Success';
export const typeLoadAuthManageFormActionFailure = '[AuthManageFormAction] Load AuthManageFormAction Failure';

export const loadAuthManageFormActionRequest = createAction(
  typeLoadAuthManageFormActionRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean, id: number, formId: string, actionId: string }>()
);

export const loadAuthManageFormActionSuccess = createAction(
  typeLoadAuthManageFormActionSuccess,
  props<{ authManageFormActionList: IAuthManageFormAction[], formId: string, actionId: string }>()
);

export const loadAuthManageFormActionFailure = createAction(
  typeLoadAuthManageFormActionFailure,
  props<{ errorText: string }>()
);