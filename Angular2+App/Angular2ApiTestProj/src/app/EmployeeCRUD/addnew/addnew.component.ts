import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api-user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModelComponent } from 'src/app/shared/model/model.component';
import { WaitingService } from 'src/app/services/waiting.service';
import { passwordComplexityValidator } from 'src/app/services/passwordComplexityValidator';
import * as DepartmentActions from 'src/app/ngrxutility/store/department/department.actions'
import * as ManageDesignationEmpActions from 'src/app/ngrxutility/store/manageDesignationEmp/manageDesignationEmp.actions'
import * as EmployeeActions from 'src/app/ngrxutility/store/employee/employee.actions';
import { Store } from '@ngrx/store';
import { selectDepartmentList } from 'src/app/ngrxutility/store/department/department.selectors';
import { selectManageDesignationEmpList } from 'src/app/ngrxutility/store/manageDesignationEmp/manageDesignationEmp.selectors';


@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit, AfterViewInit {

  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  pageTitle = "User List_Add User"

  birthDate2 = new Date();
  deptList: any = [];
  desigList: any = [];

  deptLoaded: boolean = false;
  deptLoading: boolean = false;
  desigLoaded: boolean = false;
  desigLoading: boolean = false;

  userId = new FormControl(0);
  firstName = new FormControl<string>('', Validators.required);
  lastName = new FormControl<string>('');
  departmentId = new FormControl<number>(0, Validators.required);
  designationId = new FormControl<number>(0, Validators.required);
  // emailId = new FormControl<string | null>('');
  emailId = new FormControl<string>('', Validators.email);
  mobile = new FormControl<string | null>('',
    [Validators.maxLength(10),
    Validators.minLength(10),
    Validators.pattern(/^[0-9]+$/)
    ]);
  password = new FormControl<string>('', [
    Validators.required,
    passwordComplexityValidator(),
    // Validators.minLength(8),
    // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
  ]);

  isMarried = new FormControl<boolean>(true, Validators.required);
  gender = new FormControl<string>("Male", Validators.required);
  birthDate = new FormControl<Date | null>(new Date);
  createOn = new FormControl<Date | null>(new Date());
  modifieldOn = new FormControl<Date | null>(new Date());
  isActive = new FormControl<boolean>(false, Validators.required);

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
  })

  @ViewChild('gender1') maleRadio!: ElementRef;

  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService,
    private store: Store) {
    console.log('AddnewComponent loaded')
  }

  ngOnInit(): void {



    this.fn_deptList()
  }
  ngAfterViewInit(): void {
    // this.maleRadio.nativeElement.checked = true;
    this.formGroupUserDataForm.get('isMarried')?.setValue(true);
    this.formGroupUserDataForm.get('gender')?.setValue('Male');
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

  fn_InsertData() {

    //adding waiting cursor
    this.waitingService.fn_showLoader()
    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    let curDate = new Date()
    this.formGroupUserDataForm.value.createOn = curDate;
    this.formGroupUserDataForm.value.modifieldOn = curDate;
    this.formGroupUserDataForm.value.userId = 0;
    
    this.serviceUserApiService.addEmployee(this.formGroupUserDataForm.value).subscribe({
      next: (res) => {

        // console.log("RKS:Post:", JSON.stringify(res));

        this.store.dispatch(EmployeeActions.addEmployee({ employee: res }));

        let id = res.userId

        //remove waiting cursor
        document.body.style.cursor = 'default'
        this.router.navigate(['/employee', 'view', id], {
          relativeTo: this.route,
        })
      },
      error: (err) => {
        this.waitingService.fn_hideLoader()
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
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


    // this.serviceUserApiService.addUser(this.formGroupUserDataForm.value).subscribe(res => {
    //   
    //   console.log("RKS:Post:", JSON.stringify(res));
    //   let id = res.userId
    //   //remove waiting cursor
    //   document.body.style.cursor = 'default'
    //   this.router.navigate(['/', 'userview', id], {
    //     relativeTo: this.route,
    //   })
    // });
  }

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }



}
