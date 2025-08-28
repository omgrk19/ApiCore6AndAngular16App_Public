import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as AuthProfilesActions from "./authProfiles.actions";
import { select, Store } from "@ngrx/store";
import { selectAuthProfilesDataLoaded } from "./authProfiles.selectors";
import { ApiUserService } from "src/app/services/api-user.service";



@Injectable()
export class AuthProfilesEffects {

  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadAuthProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthProfilesActions.loadAuthProfilesRequest),
      withLatestFrom(
        this.store.select(selectAuthProfilesDataLoaded)
      ),
      filter(([action, loaded]) => {
        console.log('loaded: ', !loaded);
        return (!loaded); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>               
        // this.apiService.getManageFormActionWithPage(0, 0, 0, formId, actionId).pipe(
        this.apiService.getProfileList().pipe(
          map(response => AuthProfilesActions.loadAuthProfilesSuccess({
            authProfileList: response
          })),
          catchError(error => of(AuthProfilesActions.loadAuthProfilesFailure({ errorText: error.message })))
        )
      )
    )
  );


}
