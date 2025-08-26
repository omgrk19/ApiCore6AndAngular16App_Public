import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
// import * as EmployeeActions from "../employee/employee.actions";
import * as ManageDesignationEmpActions from "../manageDesignationEmp/manageDesignationEmp.actions";
import { select, Store } from "@ngrx/store";
import { ApiUserService } from "src/app/services/api-user.service";
import { selectManageDesignationEmpDeptId, selectManageDesignationEmpDataLoaded } from "./manageDesignationEmp.selectors";




@Injectable()
export class ManageDesignationEmpEffects {



  constructor(
    private actions$: Actions,
    // private employeeService: EmployeeService,
    private apiService: ApiUserService,
    private store: Store
  ) { }

  // loadingStatus = this.store.select(selectLoading);
  // loadedStatus = this.store.select(selectLoaded);

  loadManageDesignationEmp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManageDesignationEmpActions.loadManageDesignationEmpRequest),
      withLatestFrom(
        this.store.select(selectManageDesignationEmpDataLoaded), this.store.select(selectManageDesignationEmpDeptId)
      ),
      filter(([action, loaded, deptId]) => {
        console.log('loaded: ', !loaded || (action.departmentId !== deptId));
        return (!loaded  || (action.departmentId !== deptId)); // Only fetch if not already loaded
        //return true
      }
      ), // Only fetch if not already loaded
      mergeMap(([action]) =>
        // this.employeeService.getEmployees(action.page, action.limit).pipe(        
        this.apiService.getManageDesignationWithPage(0, 0, action.id, action.departmentId?.toString(), action.designationId?.toString()).pipe(
          map(response => ManageDesignationEmpActions.loadManageDesignationEmpSuccess({
            // empResponse: response            
            // //empList: response.employeeDetails_List,
            desigList: response,
            id: action.id,
            departmentId: action.departmentId,
            designationId: action.designationId
          })),
          catchError(error => of(ManageDesignationEmpActions.loadManageDesignationEmpFailure({ errorText: error.message })))
        )
      )
    )
  );


}
