import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api-user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModelComponent } from 'src/app/shared/model/model.component';
import { WaitingService } from 'src/app/services/waiting.service';


@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  pageTitle = "User List_Add User"

  birthDate2 = new Date();
  deptList: any = [];
  desigList: any = [];

  userId = new FormControl(0);
  firstName = new FormControl<string>('', Validators.required);
  lastName = new FormControl<string>('');
  departmentId = new FormControl<number>(0, Validators.required);
  designationId = new FormControl<number>(0, Validators.required);
  // emailId = new FormControl<string | null>('');
  emailId = new FormControl<string>('', Validators.email);
  mobile = new FormControl<string | null>('',Validators.maxLength(10));
  password = new FormControl<string>('', Validators.required);
  isMaleorFemale = new FormControl<boolean>(false, Validators.required);
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
    isMaleorFemale: this.isMaleorFemale,
    birthDate: this.birthDate,
    createOn: this.createOn,
    modifieldOn: this.modifieldOn,
    isActive: this.isActive,
  })



  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService) {
    console.log('AddnewComponent loaded')
  }

  ngOnInit(): void {
    this.fn_deptList()
  }


  fn_deptList() {
    this.waitingService.fn_showLoader()

    this.deptList = [];
    this.serviceUserApiService.getDeptList().subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.deptList = res;
      },
      error: (err) => {
        this.waitingService.fn_hideLoader()

        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
      },
      complete: () => {
        this.waitingService.fn_hideLoader()
      }
    })
  }

  fn_desigList(departmentId: string = "") {
    this.waitingService.fn_showLoader()

    this.desigList = [];
    this.serviceUserApiService.getManageDesignationWithPage(1, 100, 0, departmentId).subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.desigList = res;
      },
      error: (err) => {
        this.waitingService.fn_hideLoader()

        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
      },
      complete: () => {
        this.waitingService.fn_hideLoader()
      }
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
        this.fn_showModel(err.error, "error")

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
