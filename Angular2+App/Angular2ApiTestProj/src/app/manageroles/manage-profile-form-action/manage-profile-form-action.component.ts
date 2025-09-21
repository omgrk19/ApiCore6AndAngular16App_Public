import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';
import { ChangeDetectionStrategy } from '@angular/core'
import * as AuthFormsActions from 'src/app/ngrxutility/store/authForms/authForms.actions';
import * as AuthActionActions from 'src/app/ngrxutility/store/authActions/authActions.actions';
import * as AuthProfilesActions from "src/app/ngrxutility/store/authProfiles/authProfiles.actions";
import * as AuthManageProfileFormActActions
  from "src/app/ngrxutility/store/authManageProfileFormActions/authManageProfileFormAct.actions";
import { Store } from '@ngrx/store';
import { selectAuthFormsDataLoaded, selectAuthFormsDataLoading, selectAuthFormsList } from 'src/app/ngrxutility/store/authForms/authForms.selectors';
import { selectAuthActionDataLoaded, selectAuthActionDataLoading, selectAuthActionList } from 'src/app/ngrxutility/store/authActions/authActions.selectors';
import { selectAuthProfilesDataLoaded, selectAuthProfilesDataLoading, selectAuthProfilesList } from 'src/app/ngrxutility/store/authProfiles/authProfiles.selectors';
import { selectAuthManageProfileFormActActionId, selectAuthManageProfileFormActDataLoaded, selectAuthManageProfileFormActDataLoading, selectAuthManageProfileFormActFormId, selectAuthManageProfileFormActList, selectAuthManageProfileFormActProfileId } from 'src/app/ngrxutility/store/authManageProfileFormActions/authManageProfileFormAct.selectors';
import { selectAuthManageFormActionDataLoaded, selectAuthManageFormActionDataLoading } from 'src/app/ngrxutility/store/authManageFormActions/authManageFormActions.selectors';

@Component({
  selector: 'app-manage-profile-form-action',
  templateUrl: './manage-profile-form-action.component.html',
  styleUrls: ['./manage-profile-form-action.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageProfileFormActionComponent implements OnInit, AfterViewInit {
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

  formsLoaded: boolean = false;
  formsLoading: boolean = false;
  actionsLoaded: boolean = false;
  actionsLoading: boolean = false;
  profileLoaded: boolean = false;
  profileLoading: boolean = false;
  dataLoaded: boolean = false;
  dataLoading: boolean = false;
  fltrFormId: string = '';
  fltrActionId: string = '';
  fltrProfileId: string = '';

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
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService,
    private cdr: ChangeDetectorRef, private store: Store) {

  }


  ngOnInit(): void {

    this.store.select(selectAuthFormsDataLoaded).subscribe(dataLoaded => {
      this.formsLoaded = dataLoaded;
    })
    this.store.select(selectAuthFormsDataLoading).subscribe(dataLoading => {
      this.formsLoading = dataLoading;
    })
    this.store.select(selectAuthActionDataLoaded).subscribe(dataLoaded => {
      this.actionsLoaded = dataLoaded;
    })
    this.store.select(selectAuthActionDataLoading).subscribe(dataLoading => {
      this.actionsLoading = dataLoading;
    })
    this.store.select(selectAuthProfilesDataLoaded).subscribe(dataLoaded => {
      this.profileLoaded = dataLoaded;
    })
    this.store.select(selectAuthProfilesDataLoading).subscribe(dataLoading => {
      this.profileLoading = dataLoading;
    })
    this.store.select(selectAuthManageProfileFormActDataLoaded).subscribe(dataLoaded => {
      this.dataLoaded = dataLoaded;
    })
    this.store.select(selectAuthManageProfileFormActDataLoading).subscribe(dataLoading => {
      this.dataLoading = dataLoading;
    })

    this.store.select(selectAuthManageProfileFormActProfileId).subscribe(fltProfileId => {
      this.fltrProfileId = fltProfileId;
      // this.formGroupUserDataForm.patchValue({ actionId: actionId });
    })
    this.store.select(selectAuthManageProfileFormActFormId).subscribe(formId_ => {
      this.fltrFormId = formId_;
      //  this.formGroupUserDataForm.patchValue({ formId: formId });   
    })
    this.store.select(selectAuthManageProfileFormActActionId).subscribe(actionId_ => {
      this.fltrActionId = actionId_;
      // this.formGroupUserDataForm.patchValue({ actionId: actionId });
    })

    

    this.fn_loadData();

  }

  ngAfterViewInit(): void {

    const selectE3 = document.getElementById('selProfileId') as HTMLSelectElement;
    selectE3.value = this.fltrProfileId;

    const selectEl = document.getElementById('selFormId') as HTMLSelectElement;
    selectEl.value = this.fltrFormId;

    const selectE2 = document.getElementById('selActionId') as HTMLSelectElement;
    selectE2.value = this.fltrActionId;

    
  }


  fn_loadData() {
    this.fn_profileList()
    this.fn_formList()
    this.fn_actionList()
    this.fn_UserList(this.pageNo, this.fltrProfileId, this.fltrFormId, this.fltrActionId);
  }

  fn_PageChange(pageNo: number) {

    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }



  fn_UserList(pageNo: number, profileId: string = "", formId: string = "", actionId: string = "") {

    this.waitingService.fn_showLoader()

    this.userList = [];

    // this.serviceUserApiService.getManageProfileFormActionWithPage(pageNo, this.pageSize, 0, profileId, formId, actionId).subscribe({
    //   next: (res) => {

    //     console.log("RKS:", JSON.stringify(res));

    //     this.userList = res;
    //     // let totalRecords = Number(res.totalRecords);
    //     this.pageNo = pageNo;
    //     let totalRecords = 1;
    //     this.pageNo = 1;
    //     this.fn_Paging(totalRecords);

    //   },
    //   error: (err) => {
    //     this.waitingService.fn_hideLoader()

    //     if (err.status === 403) {
    //       this.router.navigateByUrl(`/unauthorize`)
    //     }
    //     if (err.status === 401) {
    //       this.router.navigateByUrl(`/unauthenticate`)
    //     }
    //     this.fn_showModel(JSON.stringify(err.error), "error")
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // })


    this.store.dispatch(AuthManageProfileFormActActions.loadAuthManageProfileFormActRequest({
      dataLoaded: this.dataLoaded, dataLoading: this.dataLoading,
      id: 0, profileId: profileId, formId: formId, actionId: actionId
    }));

    this.store.select(selectAuthManageProfileFormActList).subscribe(res => {

      this.userList = res;
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
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
       debugger
        console.log("RKS:Post:", JSON.stringify(res));
        // this.fn_UserList(this.pageNo, this.formGroupUserDataForm.value.profileId?.toString(), this.formGroupUserDataForm.value.formId?.toString());
        this.store.dispatch(AuthManageProfileFormActActions.addAuthManageProfileFormAct({ authManageProfileFormAct: res }))

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
        this.waitingService.fn_hideLoader()
      }
    })


  }



  fn_DeleteRecord(uid: number) {

    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    //add waiting cursor
    // document.body.style.cursor = 'wait'
    this.waitingService.fn_showLoader()

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.deleteManageProfileFormAction(uid).subscribe({
      next: (res) => {
        // this.fn_UserList(this.pageNo, this.formGroupUserDataForm.value.profileId?.toString(), this.formGroupUserDataForm.value.formId?.toString());
        this.store.dispatch(AuthManageProfileFormActActions.deleteAuthManageProfileFormAct({ id: uid }))
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
        // document.body.style.cursor = 'default'
        this.waitingService.fn_hideLoader()
      }
    })
  }


  fn_formList() {
    this.formList = [];
    // this.serviceUserApiService.getFormList().subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     console.log(JSON.stringify(res))
    //     this.formList = res;
    //   },
    //   error: (err) => {

    //     document.body.style.cursor = 'default'
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
    //     document.body.style.cursor = 'default'
    //   }
    // })

    this.store.dispatch(AuthFormsActions.loadAuthFormsRequest({ dataLoaded: this.formsLoaded, dataLoading: this.formsLoading }));

    this.store.select(selectAuthFormsList).subscribe(res => {

      this.formList = res;
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
    })
  }

  fn_actionList() {
    this.actionList = [];
    // this.serviceUserApiService.getActionList().subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     console.log(JSON.stringify(res))
    //     this.actionList = res;
    //   },
    //   error: (err) => {

    //     document.body.style.cursor = 'default'
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
    //     document.body.style.cursor = 'default'
    //   }
    // })

    this.store.dispatch(AuthActionActions.loadAuthActionRequest({ dataLoaded: this.actionsLoaded, dataLoading: this.actionsLoading }));

    this.store.select(selectAuthActionList).subscribe(res => {

      this.actionList = res;
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
    })

  }

  fn_profileList() {
    this.profleList = [];
    // this.serviceUserApiService.getProfileList().subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     console.log(JSON.stringify(res))
    //     this.profleList = res;
    //   },
    //   error: (err) => {

    //     document.body.style.cursor = 'default'
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
    //     document.body.style.cursor = 'default'
    //   }
    // })

    this.store.dispatch(AuthProfilesActions.loadAuthProfilesRequest({ dataLoaded: this.profileLoaded, dataLoading: this.profileLoading }));

    this.store.select(selectAuthProfilesList).subscribe(res => {

      this.profleList = res;
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
    })
  }

  fn_showModel(msg: string, typeMsg: string) {
    debugger
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }


}


