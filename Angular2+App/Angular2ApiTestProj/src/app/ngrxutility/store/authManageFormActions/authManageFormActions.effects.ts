import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as AuthManageFormActionActions from "./authManageFormActions.actions";
import { select, Store } from "@ngrx/store";
import { ApiUserService } from "src/app/services/api-user.service";
import { selectAuthManageFormActionActionId, selectAuthManageFormActionDataLoaded, selectAuthManageFormActionFormId } from "./authManageFormActions.selectors";



@Injectable()
export class AuthManageFormActionEffects {

  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadAuthManageFormAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthManageFormActionActions.loadAuthManageFormActionRequest),
      withLatestFrom(
        this.store.select(selectAuthManageFormActionDataLoaded),
        this.store.select(selectAuthManageFormActionFormId),
        this.store.select(selectAuthManageFormActionActionId),
      ),
      filter(([action, loaded, fltFormId, fltActionId]) => {
        console.log('loaded: ', !loaded);
        return (!loaded || (action.formId !== fltFormId || action.actionId !== fltActionId)); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>
        // this.apiService.getManageFormActionWithPage(0, 0, 0, formId, actionId).pipe(
        this.apiService.getManageFormActionWithPage(0, 0, 0, action.formId, action.actionId).pipe(
          map(response => AuthManageFormActionActions.loadAuthManageFormActionSuccess({
            authManageFormActionList: response,
            formId: action.formId,
            actionId: action.actionId
          })),
          catchError(error => of(AuthManageFormActionActions.loadAuthManageFormActionFailure({ errorText: error.message })))
        )
      )
    )
  );


}
