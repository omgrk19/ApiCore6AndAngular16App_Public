import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as DesignationActions from "../designation/designation.actions";
import { select, Store } from "@ngrx/store";
import { selectDesignationDataLoaded } from "./designation.selectors";
import { ApiUserService } from "src/app/services/api-user.service";






@Injectable()
export class DesignationEffects {



  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadDesignation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DesignationActions.loadDesignationRequest),
      withLatestFrom(
        this.store.select(selectDesignationDataLoaded)
      ),
      filter(([action, loaded]) => {
        console.log('loaded: ', !loaded);
        return (!loaded); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>
        // this.employeeService.getEmployees(action.page, action.limit).pipe(        
        this.apiService.getDesigsWithPage(0, 0, action.id, 0, action.designationName).pipe(
          map(response => DesignationActions.loadDesignationSuccess({
            // empResponse: response            
            // //empList: response.employeeDetails_List,
            deptList: response,
            id: action.id,
            designationName: action.designationName
          })),
          catchError(error => of(DesignationActions.loadDesignationFailure({ errorText: error.message })))
        )
      )
    )
  );


}
