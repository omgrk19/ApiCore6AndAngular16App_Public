import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-auth-action',
  templateUrl: './auth-action.component.html',
  styleUrls: ['./auth-action.component.css']
})
export class AuthActionComponent {

  @ViewChild("tvAction") _tvAction!: ElementRef
  @ViewChild("tv_btn_save") _tv_btn_save!: ElementRef
  btn_save_text = 'Add New'

  errorMessage: string="" 

  birthDate2 = new Date();

  userList: any = [];

  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  id = new FormControl(0);
  action = new FormControl<string>('', Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
    action: this.action,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.fn_loadData();

  }

  fn_loadData() {
    this.fn_UserList(this.pageNo);

  }

  fn_PageChange(pageNo: number) {
    debugger;
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }



  fn_UserList(pageNo: number, action: string = "") {
    debugger
    document.body.style.cursor = 'wait'
    this.userList = [];
    this.serviceUserApiService.getActionWithPage(pageNo, this.pageSize, 0, 0, action).subscribe({
      next: (res) => {
        console.log("RKS:", JSON.stringify(res));
        debugger;
        this.userList = res;
        // let totalRecords = Number(res.totalRecords);
        this.pageNo = pageNo;
        let totalRecords = 1;
        this.pageNo = 1;
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
        this.router.navigate(['/unauthorize'], {
          relativeTo: this.route,
          queryParams: {
            msg: err.error
          }
        })
      },
      complete: () => {
        document.body.style.cursor = 'default'
      }
    })


  }

  fn_Paging(totalRecords: number) {
    debugger;
    this.pageQty = Math.ceil(totalRecords / this.pageSize);
  }
  
  fn_SaveData() {

    debugger;

    //add waiting cursonr
    document.body.style.cursor = 'wait'

    if (this._tv_btn_save.nativeElement.value == "Update") {
      // let curDate = new Date()
      // this.formGroupUserDataForm.value.modifieldOn = curDate;
      this.serviceUserApiService.putAction(Number(this.formGroupUserDataForm.value.id), this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          debugger;
          console.log("RKS:Post:", JSON.stringify(res));
          this.fn_UserList(this.pageNo);
          this.formGroupUserDataForm.reset();
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
          // this.router.navigate(['/unauthorize'], {
          //   relativeTo: this.route,
          //   queryParams: {
          //     msg: err.error
          //   }
          // })
          this.errorMessage = err.error
        },
        complete: () => {
          document.body.style.cursor = 'default'
        }
      })



    } else {


      // let curDate = new Date()
      // this.formGroupUserDataForm.value.createOn = curDate;
      // this.formGroupUserDataForm.value.modifieldOn = curDate;

      this.formGroupUserDataForm.value.id = 0;
      this.serviceUserApiService.postAction(this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          debugger;
          console.log("RKS:Post:", JSON.stringify(res));
          this.fn_UserList(this.pageNo);
          this.formGroupUserDataForm.reset();

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
          this.router.navigate(['/unauthorize'], {
            relativeTo: this.route,
            queryParams: {
              msg: err.error
            }
          })
        },
        complete: () => {
          document.body.style.cursor = 'default'
        }
      })

    }
  }

  fn_FillDataToUpdate(uid: number) {
    debugger
    //add waiting cursor
    document.body.style.cursor = 'wait'

    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;

    // this.serviceUserApiService.getDesig(uid).subscribe(res => {
    this.serviceUserApiService.getAction(uid).subscribe({
      next: (res) => {
        debugger;
        //console.log("RKS:Post:", JSON.stringify(res));     
        // alert(res.firstName) ;  

        this.formGroupUserDataForm = new FormGroup({
          id: new FormControl(res.id),
          action: new FormControl(res.action),
        })

        this._tvAction.nativeElement.focus();
        this._tv_btn_save.nativeElement.value = "Update";
        this.btn_save_text = "Update"
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
        this.router.navigate(['/unauthorize'], {
          relativeTo: this.route,
          queryParams: {
            msg: err.error
          }
        })
      },
      complete: () => {
        document.body.style.cursor = 'default'
      }


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
    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;

    debugger
    this.serviceUserApiService.deleteAction(uid).subscribe({
      next: (res) => {
        debugger
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


  }



}


