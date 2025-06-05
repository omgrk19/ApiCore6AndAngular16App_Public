import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { InputComponent } from 'src/app/shared/input/input.component';
import { ModelComponent } from 'src/app/shared/model/model.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {

  @ViewChild("tvDepartmentName") _tvDepartmentName!: ElementRef
  @ViewChild("tv_btn_save") _tv_btn_save!: ElementRef

  @ViewChild(InputComponent) inputComponent!: InputComponent;
  @ViewChild(ModelComponent) modelComponent!: ModelComponent;


  btn_save_text = 'Add New'

  errorMessage: string = ""

  birthDate2 = new Date();

  userList: any = [];

  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  id = new FormControl(0);
  departmentName = new FormControl<string>('', Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
    departmentName: this.departmentName,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService) {

  }


  ngOnInit(): void {
    this.fn_loadData();

  }



  fn_loadData() {
    this.fn_UserList(this.pageNo);
  }

  fn_PageChange(pageNo: number) {
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }



  fn_UserList(pageNo: number, departmentName: string = "") {
    this.waitingService.fn_showLoader()

    this.userList = [];
    this.serviceUserApiService.getDeptWithPage(pageNo, this.pageSize, 0, 0, departmentName).subscribe({
      next: (res) => {
        //console.log("RKS:", JSON.stringify(res));        
        this.userList = res;
        // let totalRecords = Number(res.totalRecords);
        this.pageNo = pageNo;
        let totalRecords = 1;
        this.pageNo = 1;
        this.fn_Paging(totalRecords);
        this.btn_save_text = 'Add New'
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
    this.errorMessage = ""

    if (this._tv_btn_save.nativeElement.value == "Update") {
      // let curDate = new Date()
      // this.formGroupUserDataForm.value.modifieldOn = curDate;
      this.serviceUserApiService.putDept(Number(this.formGroupUserDataForm.value.id), this.formGroupUserDataForm.value).subscribe({
        next: (res) => {
          
          console.log("RKS:Post:", JSON.stringify(res));
          this.fn_UserList(this.pageNo);
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
      // this.formGroupUserDataForm.value.userId = 0;

      this.formGroupUserDataForm.value.id = 0
      this.serviceUserApiService.postDept(this.formGroupUserDataForm.value).subscribe({
        next: (res) => {          
          //console.log("RKS:Post:", JSON.stringify(res));
          this.fn_UserList(this.pageNo);
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
          this.fn_showModel(JSON.stringify(err.error), "error")
        },
        complete: () => {
          //disable waiting cursor
          this.waitingService.fn_hideLoader()
          // this._tvDepartmentName.nativeElement.focus();
          this.inputComponent.fn_focus("departmentName")
          this.errorMessage = ""
        }
      })

    }
  }

  fn_reset() {
    // this.formGroupUserDataForm.reset();

    this.btn_save_text = 'Add New'
    this._tv_btn_save.nativeElement.value = "Add New";

    this.formGroupUserDataForm.get('id')?.setValue(0)
    this.formGroupUserDataForm.get('departmentName')?.setValue('');
  }

  fn_FillDataToUpdate(uid: number) {    
    //add waiting cursor
    this.waitingService.fn_showLoader()

    // let curDate = new Date()k
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.getDept(uid).subscribe({
      next: (res) => {        
        //console.log("RKS:Post:", JSON.stringify(res));             

        this.formGroupUserDataForm.get('id')?.setValue(res.id)
        this.formGroupUserDataForm.get('departmentName')?.setValue(res.departmentName);

        // this._tvDepartmentName.nativeElement.focus();
        this.inputComponent.fn_focus("departmentName")
        this._tv_btn_save.nativeElement.value = "Update";
        this.btn_save_text = "Update"
        //disable waiting cursor
        document.body.style.cursor = 'default'
      },
      error: (err) => {
        this.waitingService.fn_hideLoader()

        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
        this.fn_showModel(JSON.stringify(err.error), "error")
      },
      complete: () => {
        this.waitingService.fn_hideLoader()
      }
    });
  }

  fn_DeleteRecord(uid: number) {
    
    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    //add waiting cursor
    this.waitingService.fn_showLoader()

    // this.formGroupUserDataForm.value.lastName="rinkesh testing"
    // let curDate = new Date()
    // this.formGroupUserDataForm.value.createOn = curDate;
    // this.formGroupUserDataForm.value.modifieldOn = curDate;

    this.serviceUserApiService.deleteDept(uid).subscribe({
      next: (res) => {
        this.fn_UserList(this.pageNo);
        
      },
      error: (err) => {
        this.waitingService.fn_hideLoader()
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
        // this.errorMessage = err.error
        this.fn_showModel(JSON.stringify(err.error), "error")
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


