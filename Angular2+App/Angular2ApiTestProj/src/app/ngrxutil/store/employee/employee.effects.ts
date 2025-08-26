import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import * as EmployeeActions from "../employee/employee.actions";
import { EmployeeService } from "../services/employee.service";
import { select, Store } from "@ngrx/store";
import { selectLoaded, selectLoading } from "./employee.selectors";
import { ApiUserService } from "src/app/services/api-user.service";




@Injectable()
export class EmployeeEffects {



  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployeesRequest),
      withLatestFrom(this.store.select(selectLoaded)),
      filter(([action, loaded]) => !loaded), // Only fetch if not already loaded
      mergeMap(action =>
        // this.employeeService.getEmployees(action.page, action.limit).pipe(
        this.apiService.getEmployeeList(1,5).pipe(
          map(response => EmployeeActions.loadEmployeesSuccess({
            empResponse : response
            //empList: response.employeeDetails_List,

          })),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ errorText: error.message })))
        )
      )
    )
  );


}
