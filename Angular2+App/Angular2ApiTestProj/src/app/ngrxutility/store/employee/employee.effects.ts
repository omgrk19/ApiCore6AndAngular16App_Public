import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import * as EmployeeActions from "../employee/employee.actions";
import { select, Store } from "@ngrx/store";
import {
  selectEmployeeDepartmentId, selectEmployeeDesignationId, selectEmployeeDataLoading, selectEmployeeFirstName,
  selectEmployeeMobile, selectEmployeePageNo, selectEmployeePageSize,
  selectEmployeeDataLoaded
} from "./employee.selectors";
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
      withLatestFrom(
        this.store.select(selectEmployeeDataLoading), this.store.select(selectEmployeeDataLoaded),
        this.store.select(selectEmployeePageNo), this.store.select(selectEmployeePageSize),
        this.store.select(selectEmployeeDepartmentId), this.store.select(selectEmployeeDesignationId),
        this.store.select(selectEmployeeFirstName), this.store.select(selectEmployeeMobile)
      ),
      filter(([action, loading, loaded, pageNo, pageSize, departmentId, designationId, firstName, mobile]) => {
        console.log('Page: ', action.page, ' old pageNo: ', pageNo, ' loaded: ', loaded, ' departmentId: ', action.departmentId, ' Old departmentId: ', departmentId,);
        console.log(!loaded || (action.page !== pageNo || action.limit !== pageSize || action.firstName !== firstName || action.mobile !== mobile
          || action.departmentId !== departmentId || action.designationId !== designationId));
        // return (!loaded || action.page !== pageNo)
        return (!loaded || (action.page !== pageNo || action.limit !== pageSize || action.firstName !== firstName || action.mobile !== mobile
          || action.departmentId !== departmentId || action.designationId !== designationId)); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>
        // this.employeeService.getEmployees(action.page, action.limit).pipe(        
        this.apiService.getEmployeeList(action.page, action.limit, action.id, action.departmentId, action.designationId, action.firstName, action.mobile).pipe(
          map(response => EmployeeActions.loadEmployeesSuccess({
            // empResponse: response            
            // //empList: response.employeeDetails_List,
            empResponse: response,           
            page: action.page,
            limit: action.limit,
            id: action.id,
            departmentId: action.departmentId,
            designationId: action.designationId,
            firstName: action.firstName,
            mobile: action.mobile

          })),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ errorText: error.message })))
        )
      )
    )
  );


}
