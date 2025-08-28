import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';
// import * as ManageDesignationActions from 'src/app/ngrxutility/store/manageDesignation/manageDesignation.actions';
import * as AuthFormsActions from 'src/app/ngrxutility/store/authForms/authForms.actions';
import * as AuthActionActions from 'src/app/ngrxutility/store/authActions/authActions.actions';
import * as AuthManageFormActionActions from "src/app/ngrxutility/store/authManageFormActions/authManageFormActions.actions";
import { selectAuthFormsDataLoaded, selectAuthFormsDataLoading, selectAuthFormsList } from 'src/app/ngrxutility/store/authForms/authForms.selectors';
import { selectAuthActionDataLoaded, selectAuthActionDataLoading, selectAuthActionList } from 'src/app/ngrxutility/store/authActions/authActions.selectors';
import {
  selectAuthManageFormActionActionId, selectAuthManageFormActionDataLoaded, selectAuthManageFormActionDataLoading,
  selectAuthManageFormActionFormId, selectAuthManageFormActionList
} from 'src/app/ngrxutility/store/authManageFormActions/authManageFormActions.selectors';
import { ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-manage-form-action',
  templateUrl: './manage-form-action.component.html',
  styleUrls: ['./manage-form-action.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageFormActionComponent implements OnInit, AfterViewInit {
  @ViewChild(ModelComponent) modelComponent!: ModelComponent


  errorMessage: string = ""

  birthDate2 = new Date();

  formList: any = [];
  actionList: any = [];
  formActionList: any = [];

  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  formsLoaded: boolean = false;
  formsLoading: boolean = false;
  actionsLoaded: boolean = false;
  actionsLoading: boolean = false;
  dataLoaded: boolean = false;
  dataLoading: boolean = false;
  fltrFormId: string = '';
  fltrActionId: string = '';

  id = new FormControl(0);
  formId = new FormControl<string>('', Validators.required);
  actionId = new FormControl<string>('', Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
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
    this.store.select(selectAuthManageFormActionDataLoaded).subscribe(dataLoaded => {
      this.dataLoaded = dataLoaded;
    })
    this.store.select(selectAuthManageFormActionDataLoading).subscribe(dataLoading => {
      this.dataLoading = dataLoading;
    })

    this.store.select(selectAuthManageFormActionFormId).subscribe(formId_ => {
      this.fltrFormId = formId_;
      //  this.formGroupUserDataForm.patchValue({ formId: formId });   
    })
    
    this.store.select(selectAuthManageFormActionActionId).subscribe(actionId_ => {
      this.fltrActionId = actionId_;
      // this.formGroupUserDataForm.patchValue({ actionId: actionId });
    })

    this.fn_formList()
    this.fn_actionList()
    this.fn_UserList(this.pageNo, this.fltrFormId, this.fltrActionId);

  }

  ngAfterViewInit(): void {
    // debugger
    // this.formGroupUserDataForm.patchValue({ formId: this.fltrFormId });
    // this.formGroupUserDataForm.patchValue({ actionId: this.fltrActionId });

    const selectEl = document.getElementById('selFormId') as HTMLSelectElement;
    selectEl.value = this.fltrFormId;

    const selectE2 = document.getElementById('selActionId') as HTMLSelectElement;
    selectE2.value = this.fltrActionId;
  }



  fn_PageChange(pageNo: number) {
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }

  fn_UserList(pageNo: number, formId: string = "", actionId: string = "") {

    this.waitingService.fn_showLoader()

    this.formActionList = [];

    // this.serviceUserApiService.getManageFormActionWithPage(pageNo, this.pageSize, 0, formId, actionId).subscribe({
    //   next: (res) => {

    //     // console.log("RKS:", JSON.stringify(res));

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
    //     this.fn_showModel(err.error, "error")
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // })

    this.store.dispatch(AuthManageFormActionActions.loadAuthManageFormActionRequest({
      dataLoaded: this.dataLoaded, dataLoading: this.dataLoading,
      id: 0, formId: formId, actionId: actionId
    }));

    this.store.select(selectAuthManageFormActionList).subscribe(res => {
      
      this.formActionList = res;
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
    })


  }

  fn_Paging(totalRecords: number) {

    this.pageQty = Math.ceil(totalRecords / this.pageSize);
  }




  fn_formList() {
    this.waitingService.fn_showLoader()

    this.formList = [];
    // this.serviceUserApiService.getFormList().subscribe({
    //   next: (res) => {        
    //     this.formList = res;
    //   },
    //   error: (err) => {
    //     this.waitingService.fn_hideLoader()

    //     if (err.status === 403) {
    //       this.router.navigateByUrl(`/unauthorize`)
    //     }
    //     if (err.status === 401) {
    //       this.router.navigateByUrl(`/unauthenticate`)
    //     }
    //     this.fn_showModel(err.error, "error")
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // })

    this.store.dispatch(AuthFormsActions.loadAuthFormsRequest({ dataLoaded: this.formsLoaded, dataLoading: this.formsLoading }));

    this.store.select(selectAuthFormsList).subscribe(res => {

      this.formList = res;
      this.formGroupUserDataForm.patchValue({ formId: this.fltrFormId });
      this.waitingService.fn_hideLoader()
      this.cdr.detectChanges();
    })
  }

  fn_actionList() {
    this.waitingService.fn_showLoader()

    this.actionList = [];
    // this.serviceUserApiService.getActionList().subscribe({
    //   next: (res) => {
    //     this.actionList = res;
    //   },
    //   error: (err) => {
    //     this.waitingService.fn_hideLoader()

    //     if (err.status === 403) {
    //       this.router.navigateByUrl(`/unauthorize`)
    //     }
    //     if (err.status === 401) {
    //       this.router.navigateByUrl(`/unauthenticate`)
    //     }
    //     this.fn_showModel(err.error, "error")
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // })

    this.store.dispatch(AuthActionActions.loadAuthActionRequest({ dataLoaded: this.actionsLoaded, dataLoading: this.actionsLoading }));

    this.store.select(selectAuthActionList).subscribe(res => {

      this.actionList = res;
      this.waitingService.fn_hideLoader()
      this.formGroupUserDataForm.patchValue({ actionId: this.fltrActionId });
      this.cdr.detectChanges();
    })
  }

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }


}


