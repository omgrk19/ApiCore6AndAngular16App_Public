import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as DepartmentActions from "../department/department.actions";
import { select, Store } from "@ngrx/store";
import { selectDepartmentDataLoaded } from "./department.selectors";
import { ApiUserService } from "src/app/services/api-user.service";




@Injectable()
export class DepartmentEffects {



  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartmentRequest),
      withLatestFrom(
        this.store.select(selectDepartmentDataLoaded)
      ),
      filter(([action, loaded]) => {
        console.log('loaded: ', !loaded);
        return (!loaded); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>
        // this.employeeService.getEmployees(action.page, action.limit).pipe(        
        this.apiService.getDeptWithPage(0, 0, action.id,action.departmentName).pipe(
          map(response => DepartmentActions.loadDepartmentSuccess({
            // empResponse: response            
            // //empList: response.employeeDetails_List,
            deptList: response,
            id: action.id,
            departmentName: action.departmentName
          })),
          catchError(error => of(DepartmentActions.loadDepartmentFailure({ errorText: error.message })))
        )
      )
    )
  );


}
