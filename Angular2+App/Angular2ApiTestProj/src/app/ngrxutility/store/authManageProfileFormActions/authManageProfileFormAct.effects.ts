import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as AuthManageProfileFormActActions from "./authManageProfileFormAct.actions";
import { select, Store } from "@ngrx/store";
import { ApiUserService } from "src/app/services/api-user.service";
import { selectAuthManageProfileFormActActionId, selectAuthManageProfileFormActDataLoaded, 
  selectAuthManageProfileFormActFormId } from "./authManageProfileFormAct.selectors";
import { selectAuthManageProfileFormActProfileId } from "./authManageProfileFormAct.selectors";



@Injectable()
export class AuthManageProfileFormActEffects {

  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadAuthManageProfileFormAct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthManageProfileFormActActions.loadAuthManageProfileFormActRequest),
      withLatestFrom(
        this.store.select(selectAuthManageProfileFormActDataLoaded),
        this.store.select(selectAuthManageProfileFormActFormId),
        this.store.select(selectAuthManageProfileFormActActionId),
        this.store.select(selectAuthManageProfileFormActProfileId),

      ),
      filter(([action, loaded, fltFormId, fltActionId, fltProfileId]) => {
        console.log('Status: ', (!loaded || (action.profileId !== fltProfileId || action.formId !== fltFormId || action.actionId !== fltActionId)));
        return (!loaded || (action.profileId !== fltProfileId || action.formId !== fltFormId || action.actionId !== fltActionId )); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>
        // this.apiService.getManageFormActionWithPage(0, 0, 0, formId, actionId).pipe(
        this.apiService.getManageProfileFormActionWithPage(0, 0, 0, action.profileId, action.formId, action.actionId).pipe(
          map(response => AuthManageProfileFormActActions.loadAuthManageProfileFormActSuccess({
            authManageProfileFormActList: response,
            profileId: action.profileId,
            formId: action.formId,
            actionId: action.actionId,
          })),
          catchError(error => of(AuthManageProfileFormActActions.loadAuthManageProfileFormActFailure({ errorText: error.message })))
        )
      )
    )
  );


}
