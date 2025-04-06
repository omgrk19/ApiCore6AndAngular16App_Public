import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pageTitle = "Users"

  @ViewChild("tvFirstName") _tvFirstName!: ElementRef
  @ViewChild("tv_btn_save") _tv_btn_save!: ElementRef
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
  emailId = new FormControl<string | null>('');
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


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router
  ) {

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
        this.desigList = res;
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

    // this.serviceUserApiService.getDesigList().subscribe(res => {
    //   console.log("RKS:Desig:", JSON.stringify(res));
    //   debugger;
    //   this.desigList = res;
    // });
  }
  fn_UserList(pageNo: number) {
    document.body.style.cursor = 'wait'
    this.userList = [];
    this.serviceUserApiService.getEmployeeList(pageNo, this.pageSize).subscribe({
      next: (res) => {
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
    // this.serviceUserApiService.getUserList(pageNo, this.pageSize).subscribe(res => {
    //   console.log("RKS:", JSON.stringify(res));
    //   debugger;
    //   this.userList = res.employeeDetails_List;
    //   let totalRecords = Number(res.totalRecords);
    //   this.pageNo = pageNo;
    //   this.fn_Paging(totalRecords);
    //   this.btn_save_text = 'Add New'
    // });
  }

  fn_Paging(totalRecords: number) {
    debugger;
    this.pageQty = Math.ceil(totalRecords / this.pageSize);
  }

  fn_SaveData() {

    debugger;
    document.body.style.cursor = 'wait'

    if (this._tv_btn_save.nativeElement.value == "Update") {
      // this.formGroupUserDataForm.value.lastName="rinkesh testing"
      let curDate = new Date()
      this.formGroupUserDataForm.value.modifieldOn = curDate;

      this.serviceUserApiService.updateEmployee(Number(this.formGroupUserDataForm.value.userId), this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          this.fn_UserList(this.pageNo);
          this.formGroupUserDataForm.reset();
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

      // this.serviceUserApiService.updateUser(Number(this.formGroupUserDataForm.value.userId), this.formGroupUserDataForm.value).subscribe(res => {
      //   debugger;
      //   console.log("RKS:Post:", JSON.stringify(res));
      //   this.fn_UserList(this.pageNo);
      //   this.formGroupUserDataForm.reset();
      // });

    } else {

      // this.formGroupUserDataForm.value.lastName="rinkesh testing"
      let curDate = new Date()
      this.formGroupUserDataForm.value.createOn = curDate;
      this.formGroupUserDataForm.value.modifieldOn = curDate;
      this.formGroupUserDataForm.value.userId = 0;

      this.serviceUserApiService.addEmployee(this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          this.fn_UserList(this.pageNo);
          this.formGroupUserDataForm.reset();
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

      // this.serviceUserApiService.addUser(this.formGroupUserDataForm.value).subscribe(res => {
      //   debugger;
      //   console.log("RKS:Post:", JSON.stringify(res));
      //   this.fn_UserList(this.pageNo);
      //   this.formGroupUserDataForm.reset();
      // });
    }
  }

  fn_FillDataToUpdate(uid: number) {

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    document.body.style.cursor = 'wait'
    let curDate = new Date()
    this.formGroupUserDataForm.value.createOn = curDate;
    this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.getEmployee(uid).subscribe({
      next: (res) => {
        this.formGroupUserDataForm = new FormGroup({
          userId: new FormControl(res.userId),
          firstName: new FormControl(res.firstName),
          lastName: new FormControl(res.lastName),
          designationId: new FormControl(res.designationId),
          emailId: new FormControl(res.emailId),
          password: new FormControl(res.password),
          isMaleorFemale: new FormControl(res.isMaleorFemale),
          birthDate: new FormControl(res.birthDate),
          createOn: new FormControl(res.createOn),
          modifieldOn: new FormControl(res.modifieldOn),
          isActive: new FormControl(res.isActive),
        })
        this._tvFirstName.nativeElement.focus();
        this._tv_btn_save.nativeElement.value = "Update";
        this.btn_save_text = "Update"
        this.birthDate2 = res.birthDate
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

    // this.serviceUserApiService.getUser(uid).subscribe(res => {
    //   debugger;
    //   //console.log("RKS:Post:", JSON.stringify(res));     
    //   // alert(res.firstName) ;  

    //   this.formGroupUserDataForm = new FormGroup({
    //     userId: new FormControl(res.userId),
    //     firstName: new FormControl(res.firstName),
    //     lastName: new FormControl(res.lastName),
    //     designationId: new FormControl(res.designationId),
    //     emailId: new FormControl(res.emailId),
    //     password: new FormControl(res.password),
    //     isMaleorFemale: new FormControl(res.isMaleorFemale),
    //     birthDate: new FormControl(res.birthDate),
    //     createOn: new FormControl(res.createOn),
    //     modifieldOn: new FormControl(res.modifieldOn),
    //     isActive: new FormControl(res.isActive),
    //   })
    //   this._tvFirstName.nativeElement.focus();
    //   this._tv_btn_save.nativeElement.value = "Update";
    //   this.btn_save_text = "Update"
    //   this.birthDate2 = res.birthDate
    // });
  }

  fn_DeleteRecord(uid: number) {
    debugger;
    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    let curDate = new Date()
    this.formGroupUserDataForm.value.createOn = curDate;
    this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.deleteEmployee(uid).subscribe({
      next: (res) => {
        this.fn_UserList(this.pageNo);
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
    // });
  }



}
