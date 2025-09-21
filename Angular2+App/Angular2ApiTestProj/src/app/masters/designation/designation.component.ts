import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { InputComponent } from 'src/app/shared/input/input.component';
import { ModelComponent } from 'src/app/shared/model/model.component';
// import * as DepartmentActions from 'src/app/ngrxutility/store/department/department.actions';
import * as DesignationActions from 'src/app/ngrxutility/store/designation/designation.actions';
import { selectDesignationById, selectDesignationDataLoaded, selectDesignationDataLoading, selectDesignationId, selectDesignationList, selectDesignationName } from 'src/app/ngrxutility/store/designation/designation.selectors';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent {

  @ViewChild("tvDesignationName") _tvDesignationName!: ElementRef
  @ViewChild("tv_btn_save") _tv_btn_save!: ElementRef

  @ViewChild(InputComponent) inputComponent!: InputComponent
  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  btn_save_text = 'Add New'

  errorMessage: string = ""

  birthDate2 = new Date();

  userList: any = [];

  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  dataLoaded: boolean = false;
  dataLoading: boolean = false;

  id = new FormControl(0);
  designationName = new FormControl<string>('', Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
    designationName: this.designationName,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService, private store: Store) {

  }


  ngOnInit(): void {

    this.store.select(selectDesignationDataLoaded).subscribe(dataLoaded => {
      this.dataLoaded = dataLoaded;
    })

    this.store.select(selectDesignationDataLoading).subscribe(dataLoading => {
      this.dataLoading = dataLoading;
    })

    let id_ = 0
    this.store.select(selectDesignationId).subscribe(id => {
      id_ = id;
    })
    let name_ = ""
    this.store.select(selectDesignationName).subscribe(name => {
      name_ = name;
    })


    this.fn_loadData(1, id_, name_);

  }

  fn_loadData(pageNo: number = 0, id: number = 0, designationName: string = "") {
    this.fn_UserList(this.pageNo, id, designationName);

  }

  fn_PageChange(pageNo: number) {
    ;
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }



  fn_UserListSearch(pageNo: number, id: number = 0, designationName: string = "") {
    this.dataLoaded = false;
    this.dataLoading = false;
    this.fn_UserList(pageNo, id, designationName);
  }
  fn_UserList(pageNo: number, id: number = 0, designationName: string = "") {
    // 
    this.waitingService.fn_showLoader()

    this.userList = [];
    // this.serviceUserApiService.getDesigsWithPage(pageNo, this.pageSize, 0, 0, designationName).subscribe({
    //   next: (res) => {
    //     console.log("RKS:", JSON.stringify(res));
    //     // ;
    //     this.userList = res;
    //     // let totalRecords = Number(res.totalRecords);
    //     this.pageNo = pageNo;
    //     let totalRecords = 1;
    //     this.pageNo = 1;
    //     this.fn_Paging(totalRecords);
    //     this.btn_save_text = 'Add New'
    //   },
    //   error: (err) => {
    //     this.waitingService.fn_hideLoader()

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
    //     this.waitingService.fn_hideLoader()
    //   }
    // })


    this.store.dispatch(DesignationActions.loadDesignationRequest({ dataLoaded: this.dataLoaded, dataLoading: this.dataLoading, id: id, designationName: designationName }));

    this.store.select(selectDesignationList).subscribe(res => {
      ;
      this.userList = res;
      this.waitingService.fn_hideLoader()
      // this.cdr.detectChanges();
    })


  }

  fn_Paging(totalRecords: number) {
    // ;
    this.pageQty = Math.ceil(totalRecords / this.pageSize);
  }

  fn_SaveData() {

    //add waiting cursonr
    this.waitingService.fn_showLoader()

    this.errorMessage = ""

    if (this._tv_btn_save.nativeElement.value == "Update") {
      // let curDate = new Date()
      // this.formGroupUserDataForm.value.modifieldOn = curDate;
      this.serviceUserApiService.putDesig(Number(this.formGroupUserDataForm.value.id), this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          
          console.log("RKS:Post:", JSON.stringify(res));
          // this.fn_UserList(this.pageNo);
          this.store.dispatch(DesignationActions.updateDesignation({ designation: res }));
          this.formGroupUserDataForm.reset();
          this.fn_reset()

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
          this.errorMessage = ""
        }
      })



    } else {

      this.waitingService.fn_showLoader()

      // let curDate = new Date()
      // this.formGroupUserDataForm.value.createOn = curDate;
      // this.formGroupUserDataForm.value.modifieldOn = curDate;

      this.formGroupUserDataForm.value.id = 0;
      this.serviceUserApiService.postDesig(this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          
          console.log("RKS:Post:", JSON.stringify(res));
          // this.fn_UserList(this.pageNo);
          this.store.dispatch(DesignationActions.addDesignation({ designation: res }));
          this.fn_reset()

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
          this.inputComponent.fn_focus("designationName")
          this.errorMessage = ""
        }
      })

      // this.btn_save_text = 'Add New'
      // this._tv_btn_save.nativeElement.value = "Add New";

    }
  }

  fn_reset() {

    this.btn_save_text = 'Add New'
    this._tv_btn_save.nativeElement.value = "Add New";

    this.formGroupUserDataForm.get('id')?.setValue(0)
    this.formGroupUserDataForm.get('designationName')?.setValue('');

  }

  fn_FillDataToUpdate(uid: number) {

    //add waiting cursor
    this.waitingService.fn_showLoader()

    // // let curDate = new Date()
    // // this.formGroupUserDataForm.value.createOn = curDate;
    // // this.formGroupUserDataForm.value.modifieldOn = curDate;

    // this.serviceUserApiService.getDesig(uid).subscribe({
    //   next: (res) => {
    //     //console.log("RKS:Post:", JSON.stringify(res));             

    //     this.formGroupUserDataForm.get('id')?.setValue(res.id)
    //     this.formGroupUserDataForm.get('designationName')?.setValue(res.designationName);

    //     this.inputComponent.fn_focus("designationName")
    //     this._tv_btn_save.nativeElement.value = "Update";
    //     this.btn_save_text = "Update"
    //   },
    //   error: (err) => {
    //     this.waitingService.fn_hideLoader()

    //     if (err.status === 403) {
    //       this.router.navigateByUrl(`/unauthorize`)
    //     }
    //     if (err.status === 401) {
    //       this.router.navigateByUrl(`/unauthenticate`)
    //     }
    //     // this.router.navigate(['/unauthorize'], {
    //     //   relativeTo: this.route,
    //     //   queryParams: {
    //     //     msg: err.error
    //     //   }
    //     // })
    //     this.fn_showModel(err.error, "error")
    //   },
    //   complete: () => {
    //     this.waitingService.fn_hideLoader()
    //   }
    // });


    this.store.select(selectDesignationById(uid)).subscribe(res => {      
      if (res) {
        this.formGroupUserDataForm.get('id')?.setValue(res.id)
        this.formGroupUserDataForm.get('designationName')?.setValue(res.designationName);

        this.inputComponent.fn_focus("designationName")
        this._tv_btn_save.nativeElement.value = "Update";
        this.btn_save_text = "Update"
        this.waitingService.fn_hideLoader()
      }
    })

  }

  fn_DeleteRecord(uid: number) {
    ;
    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    //add waiting cursor
    this.waitingService.fn_showLoader()

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.deleteDesig(uid).subscribe({
      next: (res) => {
        // this.fn_UserList(this.pageNo);
        this.store.dispatch(DesignationActions.deleteDesignation({ id: uid }));
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
        this.errorMessage = ""
      }
    })


  }

  fn_showModel(msg: string, typeMsg: string) {

    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }



}

