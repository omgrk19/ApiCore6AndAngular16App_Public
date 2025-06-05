import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';

@Component({
  selector: 'app-manage-form-action',
  templateUrl: './manage-form-action.component.html',
  styleUrls: ['./manage-form-action.component.css']
})
export class ManageFormActionComponent {
  @ViewChild(ModelComponent) modelComponent!: ModelComponent
 

  errorMessage: string = ""

  birthDate2 = new Date();

  formList: any = [];
  actionList: any = [];
  userList: any = [];

  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  id = new FormControl(0);
  formId = new FormControl<string>('', Validators.required);
  actionId = new FormControl<string>('', Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
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
    this.fn_formList()
    this.fn_actionList()
    this.fn_UserList(this.pageNo);
  }

  fn_PageChange(pageNo: number) {
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }

  fn_UserList(pageNo: number, formId: string = "", actionId: string = "") {

    this.waitingService.fn_showLoader()

    this.userList = [];

    this.serviceUserApiService.getManageFormActionWithPage(pageNo, this.pageSize, 0, formId, actionId).subscribe({
      next: (res) => {

        // console.log("RKS:", JSON.stringify(res));

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




  fn_formList() {
    this.waitingService.fn_showLoader()

    this.formList = [];
    this.serviceUserApiService.getFormList().subscribe({
      next: (res) => {        
        this.formList = res;
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

  fn_actionList() {
    this.waitingService.fn_showLoader()

    this.actionList = [];
    this.serviceUserApiService.getActionList().subscribe({
      next: (res) => {
        this.actionList = res;
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

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }


}


