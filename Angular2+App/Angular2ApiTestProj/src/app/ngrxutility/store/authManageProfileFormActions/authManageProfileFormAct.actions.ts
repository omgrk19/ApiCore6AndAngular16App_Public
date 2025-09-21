import { createAction, props } from "@ngrx/store";
import { IAuthManageProfileFormAct } from "src/app/models/employee.models";




export const typeLoadAuthManageProfileFormActRequest = '[AuthManageProfileFormAct] Load AuthManageProfileFormAct Request';
export const typeLoadAuthManageProfileFormActSuccess = '[AuthManageProfileFormAct] Load AuthManageProfileFormAct Success';
export const typeLoadAuthManageProfileFormActFailure = '[AuthManageProfileFormAct] Load AuthManageProfileFormAct Failure';
export const typeLoadAuthManageProfileFormActAdd = '[AuthManageProfileFormAct] Load AuthManageProfileFormAct Add';
export const typeLoadAuthManageProfileFormActDelete = '[AuthManageProfileFormAct] Load AuthManageProfileFormAct Delete';

export const loadAuthManageProfileFormActRequest = createAction(
  typeLoadAuthManageProfileFormActRequest,
  props<{ dataLoaded: boolean, dataLoading: boolean, id: number, profileId: string, formId: string, actionId: string }>()
);

export const loadAuthManageProfileFormActSuccess = createAction(
  typeLoadAuthManageProfileFormActSuccess,
  props<{ authManageProfileFormActList: IAuthManageProfileFormAct[], profileId: string, formId: string, actionId: string }>()
);

export const loadAuthManageProfileFormActFailure = createAction(
  typeLoadAuthManageProfileFormActFailure,
  props<{ errorText: string }>()
);

export const addAuthManageProfileFormAct = createAction(
  typeLoadAuthManageProfileFormActAdd,
  props<{ authManageProfileFormAct: IAuthManageProfileFormAct }>()
);

export const deleteAuthManageProfileFormAct = createAction(
  typeLoadAuthManageProfileFormActDelete,
  props<{ id: number }>()
);