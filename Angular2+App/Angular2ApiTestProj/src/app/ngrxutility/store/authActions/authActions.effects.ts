import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as AuthActionActions from "./authActions.actions";
import { select, Store } from "@ngrx/store";
import { ApiUserService } from "src/app/services/api-user.service";
import { selectAuthActionDataLoaded } from "./authActions.selectors";



@Injectable()
export class AuthActionEffects {

  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadAuthAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionActions.loadAuthActionRequest),
      withLatestFrom(
        this.store.select(selectAuthActionDataLoaded)
      ),
      filter(([action, loaded]) => {
        console.log('loaded: ', !loaded);
        return (!loaded); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>               
        // this.apiService.getManageFormActionWithPage(0, 0, 0, formId, actionId).pipe(
        this.apiService.getActionList().pipe(
          map(response => AuthActionActions.loadAuthActionSuccess({
            authActionList: response
          })),
          catchError(error => of(AuthActionActions.loadAuthActionFailure({ errorText: error.message })))
        )
      )
    )
  );


}
