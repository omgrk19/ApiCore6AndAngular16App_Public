import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { passwordComplexityValidator } from 'src/app/services/passwordComplexityValidator';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';
// import { HttpEventType, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
import * as DepartmentActions from 'src/app/ngrxutility/store/department/department.actions'
import * as ManageDesignationEmpActions from 'src/app/ngrxutility/store/manageDesignationEmp/manageDesignationEmp.actions'
import * as EmployeeActions from 'src/app/ngrxutility/store/employee/employee.actions';
import { Store } from '@ngrx/store';
import { selectManageDesignationEmpList } from 'src/app/ngrxutility/store/manageDesignationEmp/manageDesignationEmp.selectors';
import { selectDepartmentDataLoaded, selectDepartmentDataLoading, selectDepartmentList } from 'src/app/ngrxutility/store/department/department.selectors';
import { selectManageDesignationDataLoaded, selectManageDesignationDataLoading, selectManageDesignationDeptId } from 'src/app/ngrxutility/store/manageDesignation/manageDesignation.selectors';
import { selectEmployeeById } from 'src/app/ngrxutility/store/employee/employee.selectors';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {
  pageTitle = "User List_Edit User"

  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  birthDate2 = new Date();
  deptList: any = [];
  desigList: any = [];

  deptLoaded: boolean = false;
  deptLoading: boolean = false;
  desigLoaded: boolean = false;
  desigLoading: boolean = false;
  fltDeptId: number = 0;

  selectedfile: any;

  imgUrl: any

  userId = new FormControl(0);
  firstName = new FormControl<string>('', Validators.required);
  lastName = new FormControl<string>('');
  departmentId = new FormControl<number>(0, Validators.required);
  designationId = new FormControl<number>(0, Validators.required);
  emailId = new FormControl<string | null>('');
  mobile = new FormControl<string | null>('', Validators.maxLength(10));
  password = new FormControl<string>('', [
    Validators.required,
    passwordComplexityValidator()
  ]);
  isMarried = new FormControl<boolean>(false);
  gender = new FormControl<string | null>("");
  // birthDate = new FormControl<Date | null>(new Date);
  birthDate = new FormControl("");
  createOn = new FormControl<Date | null>(new Date());
  modifieldOn = new FormControl<Date | null>(new Date());
  isActive = new FormControl<boolean>(false, Validators.required);
  photoUrl = new FormControl<string | null>('');

  formGroupUserDataForm = new FormGroup({
    userId: this.userId,
    firstName: this.firstName,
    lastName: this.lastName,
    departmentId: this.departmentId,
    designationId: this.designationId,
    emailId: this.emailId,
    mobile: this.mobile,
    password: this.password,
    isMarried: this.isMarried,
    gender: this.gender,
    birthDate: this.birthDate,
    createOn: this.createOn,
    modifieldOn: this.modifieldOn,
    isActive: this.isActive,
    photoUrl: this.photoUrl,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService,
    private store: Store, private cdr: ChangeDetectorRef) {

    this.formGroupUserDataForm = new FormGroup({
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      departmentId: this.departmentId,
      designationId: this.designationId,
      emailId: this.emailId,
      mobile: this.mobile,
      password: this.password,
      isMarried: this.isMarried,
      gender: this.gender,
      birthDate: this.birthDate,
      createOn: this.createOn,
      modifieldOn: this.modifieldOn,
      isActive: this.isActive,
      photoUrl: this.photoUrl,
    })

  }


  ngOnInit(): void {

    this.store.select(selectDepartmentDataLoaded).subscribe(res => {
      this.deptLoaded = res
    })
    this.store.select(selectDepartmentDataLoading).subscribe(res => {
      this.deptLoading = res
    })

    this.store.select(selectManageDesignationDataLoaded).subscribe(res => {
      this.desigLoaded = res
    })
    this.store.select(selectManageDesignationDataLoading).subscribe(res => {
      this.desigLoading = res
    })

    this.store.select(selectManageDesignationDeptId).subscribe(res => {
      if (this.fltDeptId != res) {
        this.fltDeptId = res
      }
    })




    this.fn_deptList()
      ;
    let id: any = this.route.snapshot.paramMap.get('id');
    this.fn_FillDataToUpdate(id)
  }

  changeImage(e: any, inputFile: File | null) {

    this.selectedfile = inputFile || e.target.files[0];
    // const file: File = inputFile || e.target.files[0];
    // let id: any = this.route.snapshot.paramMap.get('id');

    // this.serviceUserApiService.uploadImage(id, file).subscribe(res => {
    //   ;
    //   console.log(res);
    //   let obj = JSON.parse(JSON.stringify(res));
    //   this.formGroupUserDataForm.value.photoUrl = obj.path;
    //   this.imgUrl = obj.path
    //   this.fn_UpdateData2()
    // })  

  }

  fn_deptList() {
    this.waitingService.fn_showLoader()
    this.deptList = [];
    // this.serviceUserApiService.getDeptList().subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     console.log(JSON.stringify(res))
    //     this.deptList = res;
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

    this.store.dispatch(DepartmentActions.loadDepartmentRequest({ dataLoaded: this.deptLoaded, dataLoading: this.deptLoading, id: 0, departmentName: '' }));

    this.store.select(selectDepartmentList).subscribe(res => {
      ;
      this.deptList = res;
      this.waitingService.fn_hideLoader()
      //this.cdr.detectChanges();
    })
  }

  fn_desigList(departmentId: string = "") {
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
      //this.cdr.detectChanges();
    })
  }

  fn_FillDataToUpdate(uid: number) {
    this.waitingService.fn_showLoader()
    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    let curDate = new Date()
    this.formGroupUserDataForm.value.createOn = curDate;
    this.formGroupUserDataForm.value.modifieldOn = curDate;

    // //this.serviceUserApiService.getEmployee(uid).subscribe(res => {
    // this.serviceUserApiService.getEmployee(uid).subscribe({
    //   next: (res) => {
    //     this.fn_deptList()
    //     this.fn_desigList(res.departmentId)
    //     //console.log("RKS:Post:", JSON.stringify(res));     
    //     // alert(res.firstName) ;  

    //     this.formGroupUserDataForm.get('userId')?.setValue(res.userId)
    //     this.formGroupUserDataForm.get('firstName')?.setValue(res.firstName)
    //     this.formGroupUserDataForm.get('lastName')?.setValue(res.lastName)
    //     this.formGroupUserDataForm.get('departmentId')?.setValue(res.departmentId)
    //     this.formGroupUserDataForm.get('designationId')?.setValue(res.designationId)
    //     this.formGroupUserDataForm.get('emailId')?.setValue(res.emailId)
    //     this.formGroupUserDataForm.get('mobile')?.setValue(res.mobile)
    //     this.formGroupUserDataForm.get('password')?.setValue(res.password)
    //     this.formGroupUserDataForm.get('isMarried')?.setValue(res.isMarried)
    //     this.formGroupUserDataForm.get('gender')?.setValue(res.gender)
    //     this.formGroupUserDataForm.get('birthDate')?.setValue(res.birthDate)
    //     this.formGroupUserDataForm.get('createOn')?.setValue(res.createOn)
    //     this.formGroupUserDataForm.get('modifieldOn')?.setValue(res.modifieldOn)
    //     this.formGroupUserDataForm.get('isActive')?.setValue(res.isActive)
    //     this.formGroupUserDataForm.get('photoUrl')?.setValue(res.photoUrl)

    //     this.birthDate2 = res.birthDate
    //   },
    //   error: (err) => {
    //     this.waitingService.fn_hideLoader()
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // });


    this.store.select(selectEmployeeById(+uid)).subscribe(res => {

      if (res) {
        this.fn_deptList()
        this.fn_desigList(this.fltDeptId ? this.fltDeptId.toString() : "")

        this.formGroupUserDataForm.get('userId')?.setValue(res.userId)
        this.formGroupUserDataForm.get('firstName')?.setValue(res.firstName)
        this.formGroupUserDataForm.get('lastName')?.setValue(res.lastName)
        this.formGroupUserDataForm.get('departmentId')?.setValue(res.departmentId)
        this.formGroupUserDataForm.get('designationId')?.setValue(res.designationId)
        this.formGroupUserDataForm.get('emailId')?.setValue(res.emailId)
        this.formGroupUserDataForm.get('mobile')?.setValue(res.mobile)
        this.formGroupUserDataForm.get('password')?.setValue(res.password)
        this.formGroupUserDataForm.get('isMarried')?.setValue(res.isMarried)
        this.formGroupUserDataForm.get('gender')?.setValue(res.gender)
        // this.formGroupUserDataForm.get('birthDate')?.setValue(res.birthDate)
        const birthDateDate = new Date(res.birthDate);
        const birthDateStr = birthDateDate.toISOString().split('T')[0]
        this.formGroupUserDataForm.patchValue({ birthDate: birthDateStr })
        //this.formGroupUserDataForm.get('birthDate')?.setValue(birthDateDate)
        // this.formGroupUserDataForm.get('createOn')?.setValue(res.createOn)
        // this.formGroupUserDataForm.get('modifieldOn')?.setValue(res.modifieldOn)
        this.formGroupUserDataForm.get('isActive')?.setValue(res.isActive)
        this.formGroupUserDataForm.get('photoUrl')?.setValue(res.photoUrl)

        this.birthDate2 = res.birthDate
        // this.cdr.detectChanges();
        this.waitingService.fn_hideLoader()
      }

    })
  }

  fn_UpdateData() {

    //adding waiting cursor
    this.waitingService.fn_showLoader()

    let curDate = new Date()

    //uploading files        
    const file: File = this.selectedfile
    if (file == undefined) {
      //updating data        
      this.formGroupUserDataForm.value.modifieldOn = curDate;
      this.serviceUserApiService.updateEmployee(Number(this.formGroupUserDataForm.value.userId), this.formGroupUserDataForm.value).
        subscribe({
          next: (res) => {
            //updating data in store
            this.store.dispatch(EmployeeActions.updateEmployee({ employee: res }));
            this.router.navigateByUrl(`employee/view/${this.formGroupUserDataForm.value.userId}`)
          },
          error: (err) => {
            ;
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
            this.fn_showModel(JSON.stringify(err.error), "error")
          },
          complete: () => {

            this.waitingService.fn_hideLoader()
          }
        })



    } else {

      this.waitingService.fn_showLoader()

      this.serviceUserApiService.uploadImageNew(this.formGroupUserDataForm.value.userId, file).subscribe({
        next: (res) => {

          console.log(res);
          let obj = JSON.parse(JSON.stringify(res));
          this.formGroupUserDataForm.value.photoUrl = obj.path;

          //updating data
          this.formGroupUserDataForm.value.modifieldOn = curDate;
          this.serviceUserApiService.updateEmployee(Number(this.formGroupUserDataForm.value.userId), this.formGroupUserDataForm.value).subscribe({
            next: (res) => {
              this.store.dispatch(EmployeeActions.updateEmployee({ employee: res }));
              this.router.navigateByUrl(`employee/view/${this.formGroupUserDataForm.value.userId}`)
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
              this.fn_showModel(JSON.stringify(err.error), "error")
            },
            complete: () => {

            }
          })

        },
        error: (err) => {
          this.waitingService.fn_hideLoader()
          if (err.status === 403 || err.status === 401) {
            this.router.navigateByUrl(`/unauthorize`)
          }
        },
        complete: () => {
          this.waitingService.fn_hideLoader()
        }
      })

    }



  }
  fn_UpdateData2() {

    let curDate = new Date()
    this.formGroupUserDataForm.value.modifieldOn = curDate;
    this.serviceUserApiService.updateEmployee(Number(this.formGroupUserDataForm.value.userId), this.formGroupUserDataForm.value).subscribe(res => {
    })

  }

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }


}
