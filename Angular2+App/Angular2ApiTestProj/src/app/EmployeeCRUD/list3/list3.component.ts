import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { timeout } from 'rxjs';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';
// import * as EmployeeActions from '../store/employee/employee.actions';
import * as EmployeeActions from 'src/app/ngrxutility/store/employee/employee.actions';
import * as DepartmentActions from 'src/app/ngrxutility/store/department/department.actions'
import * as ManageDesignationEmpActions from 'src/app/ngrxutility/store/manageDesignationEmp/manageDesignationEmp.actions'
import {
  selectEmployeeDepartmentId, selectEmployeeDesignationId, selectEmployeesInfo, selectEmployeeFirstName,
  selectEmployeeMobile, selectEmployeePageNo, selectEmployeePageSize,
  selectEmployeeDataLoaded,
  selectEmployeeDataLoading,
} from 'src/app/ngrxutility/store/employee/employee.selectors';
import { IEmployeeState } from 'src/app/ngrxutility/store/employee/employee.state';
import { selectDepartmentDataLoaded, selectDepartmentDataLoading, selectDepartmentList } from 'src/app/ngrxutility/store/department/department.selectors';
import { selectManageDesignationEmpDataLoaded, selectManageDesignationEmpDataLoading, selectManageDesignationEmpList } from 'src/app/ngrxutility/store/manageDesignationEmp/manageDesignationEmp.selectors';

@Component({
  selector: 'app-list3',
  templateUrl: './list3.component.html',
  styleUrls: ['./list3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class List3Component implements OnInit {
  pageTitle = "User List"

  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  @ViewChild("tvFirstName") _tvFirstName!: ElementRef
  @ViewChild("tv_btn_save") _tv_btn_save!: ElementRef
  @ViewChild("selPageSizeList") _selPageSizeList!: ElementRef<HTMLSelectElement>
  //@ViewChild("selPageSizeList") _selPageSizeList!: ElementRef
  btn_save_text = 'Add New'

  birthDate2 = new Date();

  employeeInfo!: IEmployeeState;
  userList: any = [];
  deptList: any = [];
  desigList: any = [];

  pageQty: number = 0;
  dispPageQty: number = 3;
  pageSize: number = 5;

  empLoaded: boolean = false;
  empLoading: boolean = false;
  deptLoaded: boolean = false;
  deptLoading: boolean = false;
  desigLoaded: boolean = false;
  desigLoading: boolean = false;
  //pageSize = new FormControl(5);
  pageNo: number = 1;
  startPageNo: number = 1;
  endPageNo: number = 1;


  error: any;

  userId = new FormControl(0);
  firstName = new FormControl<string>('', Validators.required);
  lastName = new FormControl<string>('');
  departmentId = new FormControl<number | null>(0);
  designationId = new FormControl<number | null>(0);
  emailId = new FormControl<string | null>('');
  mobile = new FormControl<string | null>('');
  password = new FormControl<string>('', Validators.required);
  isMaleorFemale = new FormControl<boolean>(false);
  birthDate = new FormControl<Date | null>(new Date);
  createOn = new FormControl<Date | null>(new Date());
  modifieldOn = new FormControl<Date | null>(new Date());
  isActive = new FormControl<boolean>(false, Validators.required);

  formGroupEmployee3FilterForm = new FormGroup({
    // userId: this.userId,
    firstName: this.firstName,
    // lastName: this.lastName,
    departmentId: this.departmentId,
    designationId: this.designationId,
    // emailId: this.emailId,
    mobile: this.mobile,
    // isMaleorFemale: this.isMaleorFemale,
    // birthDate: this.birthDate,
    // createOn: this.createOn,
    // modifieldOn: this.modifieldOn,
    // isActive: this.isActive,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private waitingService: WaitingService,
    private cdr: ChangeDetectorRef, private store: Store) {

  }


  ngOnInit(): void {

    this.fn_loadData();
  }

  fn_loadData() {



    this.store.select(selectDepartmentDataLoaded).subscribe(loaded => {
      this.deptLoaded = !!loaded as boolean;
    });
    this.store.select(selectDepartmentDataLoading).subscribe(loading => {
      this.deptLoading = !!loading as boolean;
    });

    this.store.select(selectManageDesignationEmpDataLoaded).subscribe(loaded => {
      this.desigLoaded = !!loaded as boolean;
    });
    this.store.select(selectManageDesignationEmpDataLoading).subscribe(loading => {
      this.desigLoading = !!loading as boolean;
    });

    this.fn_deptList();


    this.store.select(selectEmployeeDataLoaded).subscribe(loaded => {
      this.empLoaded = !!loaded as boolean;
    });
    this.store.select(selectEmployeeDataLoading).subscribe(loading => {
      this.empLoading = !!loading as boolean;
    });

    this.store.select(selectEmployeePageNo).subscribe(pageNo => {
      // ;
      this.pageNo = pageNo === 0 ? 1 : pageNo; // Ensure pageNo is at least 1
    })
    this.store.select(selectEmployeePageSize).subscribe(pageSize => {
      ;
      this.pageSize = pageSize === 0 ? 5 : pageSize; // Ensure pageNo is at least 5
      // this._selPageSizeList.nativeElement.value = this.pageSize.toString(); 
      // this.cdr.detectChanges();      
      const selectEl = document.getElementById('selPageSizeList') as HTMLSelectElement;
      selectEl.value = this.pageSize.toString();
    })

    let deptId = 0;
    this.store.select(selectEmployeeDepartmentId).subscribe(departmentId => {
      ;
      deptId = departmentId !== undefined ? departmentId : 0;
      this.formGroupEmployee3FilterForm.patchValue({ departmentId: deptId });

      // const selDeptId = document.getElementById('ddlDepartmentId') as HTMLSelectElement;
      // selDeptId.value = deptId
    })

    if (deptId > 0) {
      this.fn_desigList(deptId.toString());
    }

    let desigId = 0;
    this.store.select(selectEmployeeDesignationId).subscribe(designationId => {
      ;
      desigId = designationId == undefined ? 0 : designationId;
      this.formGroupEmployee3FilterForm.patchValue({ designationId: desigId });
    })

    let ffirstName: string | undefined = '';
    this.store.select(selectEmployeeFirstName).subscribe(firstName => {
      ;
      ffirstName = firstName;
      this.formGroupEmployee3FilterForm.patchValue({ firstName: ffirstName });
      // this.formGroupEmployee3FilterForm.get('firstName')?.setValue(fname?.toString());
    })

    let fmobile: string | undefined = '';
    this.store.select(selectEmployeeMobile).subscribe(mobile => {
      ;
      fmobile = mobile;
      this.formGroupEmployee3FilterForm.patchValue({ mobile: fmobile });
      // this.formGroupEmployee3FilterForm.get('firstName')?.setValue(fname?.toString());
    })

    this.fn_UserList(this.pageNo, 0, deptId, desigId, ffirstName, fmobile);
  }

  fn_fiterUserList() {

    let firstName = this.formGroupEmployee3FilterForm.value.firstName
    let mobile = this.formGroupEmployee3FilterForm.value.mobile
    let departmentId = this.formGroupEmployee3FilterForm.value.departmentId
    let designationId = this.formGroupEmployee3FilterForm.value.designationId

    this.empLoaded = false;
    this.empLoading = false;
    this.pageNo = 1
    this.fn_UserList(this.pageNo, 0, departmentId, designationId, firstName, mobile);
  }

  fn_PageSizeChange(pageSz: any) {
    this.pageSize = pageSz.target.value
    this.pageNo = 1
    this.fn_UserList(this.pageNo, 0, this.departmentId.value, this.designationId.value, this.firstName.value, this.mobile.value);
  }

  fn_PageChange(pageNo: number) {

    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);

    // this.startPageNo = 

    this.fn_UserList(pageNo, 0, this.departmentId.value, this.designationId.value, this.firstName.value, this.mobile.value);
  }

  fn_deptList() {
    ;
    this.waitingService.fn_showLoader()
    this.deptList = [];
    // this.serviceUserApiService.getDeptList().subscribe({
    //   next: (res) => {
    //     // ;
    //     console.log(res)
    //     console.log(JSON.stringify(res))
    //     this.deptList3 = res;
    //   },
    //   error: (err) => {

    //     this.waitingService.fn_hideLoader()
    //     if (err.status === 403) {
    //       this.router.navigateByUrl(`/unauthorize`)
    //     }
    //     if (err.status === 401) {
    //       this.router.navigateByUrl(`/unauthenticate`)
    //     }
    //   },
    //   complete: () => {
    //     document.body.style.cursor = 'default'
    //     this.waitingService.fn_hideLoader()
    //   }
    // })

    this.store.dispatch(DepartmentActions.loadDepartmentRequest({ dataLoaded: this.deptLoaded, dataLoading: this.deptLoading, id: 0, departmentName: '' }));

    this.store.select(selectDepartmentList).subscribe(res => {
      ;
      this.deptList = res;
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
    })

  }

  fn_desigList(departmentId: string = "") {
    ;
    this.waitingService.fn_showLoader()

    this.desigList = [];
    // this.serviceUserApiService.getManageDesignationWithPage(1, 100, 0, departmentId).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     console.log(JSON.stringify(res))
    //     this.desigList = res;
    //   },
    //   error: (err) => {

    //     this.waitingService.fn_hideLoader()
    //     if (err.status === 403) {
    //       this.router.navigateByUrl(`/unauthorize`)
    //     }
    //     if (err.status === 401) {
    //       this.router.navigateByUrl(`/unauthenticate`)
    //     }
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // })

    this.store.dispatch(ManageDesignationEmpActions.loadManageDesignationEmpRequest({
      dataLoaded: this.desigLoaded,
      dataLoading: this.desigLoading, departmentId: Number(departmentId)
    }));

    this.store.select(selectManageDesignationEmpList).subscribe(res => {
      ;
      this.desigList = res;
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
    })

  }

  fn_UserList(pageNo: number, id: any = 0, departmentId: any = 0, designationId: any = 0, firstName: any = "", mobile: any = "") {
    ;
    this.waitingService.fn_showLoader()
    this.userList = [];
    // this.serviceUserApiService.getEmployeeList(pageNo, this.pageSize, id, departmentId, designationId, firstName, mobile).subscribe({
    //   next: (res) => {
    //      ;
    //     console.log("RKS:", JSON.stringify(res));        
    //     // this.userList = res.usersDetails_List;
    //     this.userList = res.employeeDetails_List;
    //     let totalRecords = Number(res.totalRecords);
    //     this.pageNo = pageNo;
    //     this.fn_Paging(totalRecords);
    //     this.btn_save_text = 'Add New' 

    //     this.cdr.detectChanges()
    //   },
    //   error: (err) => {

    //     this.waitingService.fn_hideLoader()
    //     if (err.status === 403) {
    //       this.router.navigateByUrl(`/unauthorize`)
    //     }
    //     if (err.status === 401) {
    //       this.router.navigateByUrl(`/unauthenticate`)
    //     }
    //     this.router.navigate(['/unauthorize'], {
    //       relativeTo: this.route,
    //       queryParams: {
    //         msg: err.error
    //       }
    //     })
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // })

    this.store.dispatch(EmployeeActions.loadEmployeesRequest({
      dataLoaded: this.empLoaded, dataLoading: this.empLoading,
      page: pageNo, limit: this.pageSize, id: id, departmentId: departmentId,
      designationId: designationId, firstName: firstName, mobile: mobile
    }));

    // this.store.select(selectEmployees).subscribe(item =>{
    this.store.select(selectEmployeesInfo).subscribe(res => {
      // ;
      //this.employees = res;
      this.employeeInfo = res;

      this.error = this.employeeInfo.error;

      let totalRecords = Number(res.totalRecords);
      this.pageNo = pageNo;
      this.fn_Paging(totalRecords);
      this.btn_save_text = 'Add New'

      this.cdr.detectChanges()
      console.log('Employees: ', this.employeeInfo);
      this.waitingService.fn_hideLoader()
    });




  }

  fn_Paging(totalRecords: number) {
    // this.pageQty = Math.ceil(totalRecords / this.pageSize);
    this.pageQty = Math.ceil(this.employeeInfo.totalRecords / this.employeeInfo.pageSize);
  }


  fn_DeleteRecord(uid: number) {
    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    // this.serviceUserApiService.deleteUser(uid).subscribe(res => {
    //   this.fn_UserList(this.pageNo);
    // });
    this.waitingService.fn_showLoader()
    this.serviceUserApiService.deleteEmployee(uid).subscribe({
      next: (res) => {
        this.fn_UserList(this.pageNo);

      },
      error: (err) => {
        this.waitingService.fn_hideLoader()
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
        // this.router.navigate(['/unauthorize'], {
        //   relativeTo: this.route,
        //   queryParams: {
        //     msg: err.error
        //   }
        // })
        this.fn_showModel(err.error, "error")
      },
      complete: () => {
        this.waitingService.fn_hideLoader()
      }
    });
  }

  f_createnew() {
    this.router.navigate(['/employee', 'add'], {
      relativeTo: this.route
    })
  }

  fn_NavigateToView(uid: number) {
    this.router.navigate(['/employee', 'view', uid], {
      relativeTo: this.route
    })
  }

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }

}
