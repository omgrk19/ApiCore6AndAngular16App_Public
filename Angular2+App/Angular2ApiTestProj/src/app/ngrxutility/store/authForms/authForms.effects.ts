import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as AuthFormsActions from "./authForms.actions";
import { select, Store } from "@ngrx/store";
import { selectAuthFormsDataLoaded } from "./authForms.selectors";
import { ApiUserService } from "src/app/services/api-user.service";



@Injectable()
export class AuthFormsEffects {

  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadAuthForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthFormsActions.loadAuthFormsRequest),
      withLatestFrom(
        this.store.select(selectAuthFormsDataLoaded)
      ),
      filter(([action, loaded]) => {
        console.log('loaded: ', !loaded);
        return (!loaded); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>               
        // this.apiService.getManageFormActionWithPage(0, 0, 0, formId, actionId).pipe(
        this.apiService.getFormList().pipe(
          map(response => AuthFormsActions.loadAuthFormsSuccess({
            authFormsList: response
          })),
          catchError(error => of(AuthFormsActions.loadAuthFormsFailure({ errorText: error.message })))
        )
      )
    )
  );


}
