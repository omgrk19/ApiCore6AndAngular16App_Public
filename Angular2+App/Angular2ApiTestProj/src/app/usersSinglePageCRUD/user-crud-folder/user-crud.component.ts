import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { InputComponent } from 'src/app/shared/input/input.component';

@Component({
  selector: 'user-crud-component',
  templateUrl: './user-crud.component.html'
})
export class userCrudComponent implements OnInit {
  pageTitle = "Users Single Page CRUD"
  @ViewChild("tvFirstName") _tvFirstName!: ElementRef
  @ViewChild("tv_btn_save") _tv_btn_save!: ElementRef

  @ViewChild(InputComponent) inputComponent!: InputComponent;

  btn_save_text = 'Add New'

  birthDate2 = new Date();

  userList: any = [];
  desigList: any = [];
  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  userId = new FormControl(0);
  firstName = new FormControl<string>('', Validators.required);
  lastName = new FormControl<string>('');
  designationId = new FormControl<number | null>(0);
  //emailId = new FormControl<string>('', [Validators.required, Validators.email]);
  emailId = new FormControl<string>('',  Validators.email);
  password = new FormControl<string>('', Validators.required);
  isMaleorFemale = new FormControl<boolean>(false);
  birthDate = new FormControl<Date | null>(new Date);
  createOn = new FormControl<Date | null>(new Date());
  modifieldOn = new FormControl<Date | null>(new Date());
  isActive = new FormControl<boolean>(false, Validators.required);

  formGroupUserDataForm = new FormGroup({
    userId: this.userId,
    firstName: this.firstName,
    lastName: this.lastName,
    designationId: this.designationId,
    emailId: this.emailId,
    password: this.password,
    isMaleorFemale: this.isMaleorFemale,
    birthDate: this.birthDate,
    createOn: this.createOn,
    modifieldOn: this.modifieldOn,
    isActive: this.isActive,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder, private router: Router) {

  }


  ngOnInit(): void {
    this.fn_loadData();

  }

  fn_loadData() {
    this.fn_UserList(this.pageNo);
    this.fn_desigList();
  }

  fn_PageChange(pageNo: number) {
    debugger;
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }
  fn_desigList() {

    document.body.style.cursor = 'wait'
    this.userList = [];
    this.serviceUserApiService.getDesigList().subscribe({
      next: (res) => {
        console.log("RKS:Desig:", JSON.stringify(res));
        debugger;
        this.desigList = res;
        document.body.style.cursor = 'default'
      },
      error: (err) => {
        document.body.style.cursor = 'default'
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
      },
      complete: () => {
        document.body.style.cursor = 'default'
      }
    })

  }
  fn_reset() {
    this.formGroupUserDataForm.get('userId')?.setValue(0)
    this.formGroupUserDataForm.get('firstName')?.setValue('')
    this.formGroupUserDataForm.get('lastName')?.setValue('')
    this.formGroupUserDataForm.get('designationId')?.setValue(0)
    this.formGroupUserDataForm.get('emailId')?.setValue('')
    this.formGroupUserDataForm.get('password')?.setValue('')
    this.formGroupUserDataForm.get('isMaleorFemale')?.setValue(false)
    this.formGroupUserDataForm.get('birthDate')?.setValue(null)
    this.formGroupUserDataForm.get('createOn')?.setValue(null)
    this.formGroupUserDataForm.get('modifieldOn')?.setValue(null)
    this.formGroupUserDataForm.get('isActive')?.setValue(false)
  }

  fn_UserList(pageNo: number) {
    document.body.style.cursor = 'wait'
    this.userList = [];
    this.serviceUserApiService.getEmployeeList(pageNo, this.pageSize).subscribe({
      next: (res) => {
        console.log("RKS:", JSON.stringify(res));
        debugger;
        this.userList = res.employeeDetails_List;
        let totalRecords = Number(res.totalRecords);
        this.pageNo = pageNo;
        this.fn_Paging(totalRecords);
        this.btn_save_text = 'Add New'
      },
      error: (err) => {
        document.body.style.cursor = 'default'
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
      },
      complete: () => {
        document.body.style.cursor = 'default'
      }
    })

  }

  fn_Paging(totalRecords: number) {
    this.pageQty = Math.ceil(totalRecords / this.pageSize);
  }

  fn_SaveData() {

    //add waiting cursonr
    document.body.style.cursor = 'wait'

    if (this._tv_btn_save.nativeElement.value == "Update") {
      // this.formGroupUserDataForm.value.lastName="rinkesh testing"
      let curDate = new Date()
      this.formGroupUserDataForm.value.modifieldOn = curDate;
      this.serviceUserApiService.updateEmployee(Number(this.formGroupUserDataForm.value.userId), this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          debugger;
          console.log("RKS:Post:", JSON.stringify(res));
          this.fn_UserList(this.pageNo);
          this.fn_reset()
          //disable waiting cursor
          document.body.style.cursor = 'default'
        },
        error: (err) => {
          document.body.style.cursor = 'default'
          if (err.status === 403) {
            this.router.navigateByUrl(`/unauthorize`)
          }
          if (err.status === 401) {
            this.router.navigateByUrl(`/unauthenticate`)
          }
        },
        complete: () => {
          document.body.style.cursor = 'default'
        }
      })


    } else {

      // this.formGroupUserDataForm.value.lastName="rinkesh testing"
      let curDate = new Date()
      this.formGroupUserDataForm.value.createOn = curDate;
      this.formGroupUserDataForm.value.modifieldOn = curDate;
      this.formGroupUserDataForm.value.userId = 0;

      this.serviceUserApiService.addEmployee(this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          debugger;
          console.log("RKS:Post:", JSON.stringify(res));
          this.fn_UserList(this.pageNo);
          this.fn_reset()

          //disable waiting cursor
          document.body.style.cursor = 'default'
        },
        error: (err) => {
          document.body.style.cursor = 'default'
          if (err.status === 403) {
            this.router.navigateByUrl(`/unauthorize`)
          }
          if (err.status === 401) {
            this.router.navigateByUrl(`/unauthenticate`)
          }
        },
        complete: () => {
          document.body.style.cursor = 'default'
        }
      })

    }
  }

  fn_FillDataToUpdate(uid: number) {

    //add waiting cursor
    document.body.style.cursor = 'wait'

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    let curDate = new Date()
    this.formGroupUserDataForm.value.createOn = curDate;
    this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.getEmployee(uid).subscribe(res => {

      this.formGroupUserDataForm.get('userId')?.setValue(res.userId);
      this.formGroupUserDataForm.get('firstName')?.setValue(res.firstName);
      this.formGroupUserDataForm.get('lastName')?.setValue(res.lastName);
      this.formGroupUserDataForm.get('designationId')?.setValue(res.designationId);
      this.formGroupUserDataForm.get('emailId')?.setValue(res.emailId);
      this.formGroupUserDataForm.get('password')?.setValue(res.password);
      this.formGroupUserDataForm.get('isMaleorFemale')?.setValue(res.isMaleorFemale);
      this.formGroupUserDataForm.get('birthDate')?.setValue(res.birthDate);
      this.formGroupUserDataForm.get('createOn')?.setValue(res.createOn);
      this.formGroupUserDataForm.get('modifieldOn')?.setValue(res.modifieldOn);
      this.formGroupUserDataForm.get('isActive')?.setValue(res.isActive);

      this.inputComponent.fn_focus("lastName");
      this._tv_btn_save.nativeElement.value = "Update";
      this.btn_save_text = "Update"
      this.birthDate2 = res.birthDate

      //disable waiting cursor
      document.body.style.cursor = 'default'

    });
  }

  fn_DeleteRecord(uid: number) {
    debugger;
    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    //add waiting cursor
    document.body.style.cursor = 'wait'

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    let curDate = new Date()
    this.formGroupUserDataForm.value.createOn = curDate;
    this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.deleteEmployee(uid).subscribe({
      next: (res) => {
        this.fn_UserList(this.pageNo);
        //disable waiting cursor
        document.body.style.cursor = 'default'
      },
      error: (err) => {
        document.body.style.cursor = 'default'
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
      },
      complete: () => {
        document.body.style.cursor = 'default'
      }
    })

    // this.serviceUserApiService.deleteUser(uid).subscribe(res => {
    //   this.fn_UserList(this.pageNo);

    //   //disable waiting cursor
    //   document.body.style.cursor = 'default'
    // });
  }



}
