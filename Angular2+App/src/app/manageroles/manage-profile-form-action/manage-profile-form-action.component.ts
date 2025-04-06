import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';

@Component({
  selector: 'app-manage-profile-form-action',
  templateUrl: './manage-profile-form-action.component.html',
  styleUrls: ['./manage-profile-form-action.component.css']
})
export class ManageProfileFormActionComponent {
  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  errorMessage: string = ""

  birthDate2 = new Date();

  profleList: any = [];
  formList: any = [];
  actionList: any = [];
  userList: any = [];

  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  id = new FormControl(0);
  profileId = new FormControl<string>('', Validators.required);
  formId = new FormControl<string>('', Validators.required);
  actionId = new FormControl<string>('', Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
    profileId: this.profileId,
    formId: this.formId,
    actionId: this.actionId,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService) {

  }


  ngOnInit(): void {
    this.fn_loadData();

  }

  fn_loadData() {
    this.fn_profileList()
    this.fn_formList()
    this.fn_actionList()
    this.fn_UserList(this.pageNo);
  }

  fn_PageChange(pageNo: number) {

    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }



  fn_UserList(pageNo: number, profileId: string = "", formId: string = "", actionId: string = "") {

    this.waitingService.fn_showLoader()
    
    this.userList = [];

    this.serviceUserApiService.getManageProfileFormActionWithPage(pageNo, this.pageSize, 0, profileId, formId, actionId).subscribe({
      next: (res) => {

        console.log("RKS:", JSON.stringify(res));

        this.userList = res;
        // let totalRecords = Number(res.totalRecords);
        this.pageNo = pageNo;
        let totalRecords = 1;
        this.pageNo = 1;
        this.fn_Paging(totalRecords);

      },
      error: (err) => {
        this.waitingService.fn_hideLoader()

        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
        this.fn_showModel(err.error, "error")
      },
      complete: () => {
        this.waitingService.fn_hideLoader()
      }
    })


  }

  fn_Paging(totalRecords: number) {

    this.pageQty = Math.ceil(totalRecords / this.pageSize);
  }

  fn_SaveData() {

    //add waiting cursonr
    this.waitingService.fn_showLoader()
    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;
    this.formGroupUserDataForm.value.id = 0;

    this.serviceUserApiService.postManageProfileFormAction(this.formGroupUserDataForm.value).subscribe({
      next: (res) => {

        console.log("RKS:Post:", JSON.stringify(res));
        this.fn_UserList(this.pageNo, this.formGroupUserDataForm.value.profileId?.toString(), this.formGroupUserDataForm.value.formId?.toString());
        
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
    })


  }



  fn_DeleteRecord(uid: number) {

    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    //add waiting cursor
    document.body.style.cursor = 'wait'

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.deleteManageProfileFormAction(uid).subscribe({
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
        // this.router.navigate(['/unauthorize'], {
        //   relativeTo: this.route,
        //   queryParams: {
        //     msg: err.error
        //   }
        // })
        this.fn_showModel(err.error, "error")
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

  fn_showModel(msg: string, typeMsg: string) {
    debugger
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg    
    this.modelComponent.fn_show_model()
  }


}


