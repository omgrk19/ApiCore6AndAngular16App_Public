import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-manage-user-profile-form-action',
  templateUrl: './manage-user-profile-form-action.component.html',
  styleUrls: ['./manage-user-profile-form-action.component.css']
})
export class ManageUserProfileFormActionComponent {

  birthDate2 = new Date();


  userList: any = [];
  profleList: any = [];
  formList: any = [];
  actionList: any = [];
  authUserList: any = [];

  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  id = new FormControl(0);
  userId = new FormControl<string>('', Validators.required);
  profileId = new FormControl<string>('', Validators.required);
  formId = new FormControl<string>('', Validators.required);
  actionId = new FormControl<string>('', Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
    userId: this.userId,
    profileId: this.profileId,
    formId: this.formId,
    actionId: this.actionId,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.fn_loadData();

  }

  fn_loadData() {
    this.fn_authUserList()
    this.fn_profileList()
    this.fn_formList()
    this.fn_actionList()
    this.fn_UserList(this.pageNo);
  }

  fn_PageChange(pageNo: number) {
    debugger;
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }



  fn_UserList(pageNo: number, userId: string = "", profileId: string = "", formId: string = "", actionId: string = "") {
    debugger
    document.body.style.cursor = 'wait'
    this.userList = [];

    this.serviceUserApiService.getManageUserProfileFormActionWithPage(pageNo, this.pageSize, 0, userId, profileId, formId, actionId).subscribe({
      next: (res) => {
        console.log("RKS:", JSON.stringify(res));
        debugger;
        this.userList = res;
        // let totalRecords = Number(res.totalRecords);
        this.pageNo = pageNo;
        let totalRecords = 1;
        this.pageNo = 1;
        this.fn_Paging(totalRecords);

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
    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;
    this.formGroupUserDataForm.value.id = 0;

    this.serviceUserApiService.postManageUserProfileFormAction(this.formGroupUserDataForm.value).subscribe({
      next: (res) => {
        debugger;
        console.log("RKS:Post:", JSON.stringify(res));
        this.fn_UserList(this.pageNo, this.formGroupUserDataForm.value.profileId?.toString(), this.formGroupUserDataForm.value.formId?.toString());
        // this.formGroupUserDataForm.reset();        

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

    this.serviceUserApiService.deleteManageUserProfileFormAction(uid).subscribe({
      next: (res) => {
        this.fn_UserList(this.pageNo, this.formGroupUserDataForm.value.profileId?.toString(), this.formGroupUserDataForm.value.formId?.toString());
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


  fn_formList() {
    this.formList = [];
    this.serviceUserApiService.getFormList().subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.formList = res;
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

  fn_actionList() {
    this.actionList = [];
    this.serviceUserApiService.getActionList().subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.actionList = res;
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

  fn_profileList() {
    this.profleList = [];
    this.serviceUserApiService.getProfileList().subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.profleList = res;
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

  fn_authUserList() {
    this.authUserList = [];
    this.serviceUserApiService.getUserList().subscribe({
      next: (res) => {
        debugger
        console.log(res)
        console.log(JSON.stringify(res))
        this.authUserList = res;
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



