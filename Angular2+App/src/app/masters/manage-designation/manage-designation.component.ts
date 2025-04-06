import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';

@Component({
  selector: 'app-manage-designation',
  templateUrl: './manage-designation.component.html',
  styleUrls: ['./manage-designation.component.css']
})
export class ManageDesignationComponent {

  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  errorMessage: string = ""

  birthDate2 = new Date();

  userList: any = [];
  departmentList: any = [];
  designationList: any = [];


  pageQty: number = 0;
  pageSize: number = 50;
  pageNo: number = 1;

  id = new FormControl(0);
  departmentId = new FormControl<string>("", Validators.required);
  designationId = new FormControl<string>("", Validators.required);


  formGroupUserDataForm = new FormGroup({
    id: this.id,
    departmentId: this.departmentId,
    designationId: this.designationId,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService) {

  }


  ngOnInit(): void {
    this.fn_loadData()

  }

  fn_loadData() {
    this.fn_departmentList()
    this.fn_designationList()
    this.fn_UserList(this.pageNo)
  }

  fn_PageChange(pageNo: number) {
    
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);
    this.fn_UserList(pageNo);
  }



  fn_UserList(pageNo: number, departmentId: string = "", designationId: string = "") {
    
    this.waitingService.fn_showLoader()
    this.userList = [];

    this.serviceUserApiService.getManageDesignationWithPage(pageNo, this.pageSize, 0, departmentId, designationId).subscribe({
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

    this.serviceUserApiService.postManageDesignation(this.formGroupUserDataForm.value).subscribe({
      next: (res) => {
        //console.log("RKS:Post:", JSON.stringify(res));
        this.fn_UserList(this.pageNo, this.formGroupUserDataForm.value.departmentId as string, this.formGroupUserDataForm.value.designationId as string);
        // this.formGroupUserDataForm.reset();        
        
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

    this.serviceUserApiService.deleteManageDesignation(uid).subscribe({
      next: (res) => {
        this.fn_UserList(this.pageNo, this.formGroupUserDataForm.value.departmentId as string, this.formGroupUserDataForm.value.designationId as string);
        
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
        this.errorMessage = ""
      }
    })
  }


  fn_departmentList() {
    this.waitingService.fn_showLoader()

    this.departmentList = [];
    this.serviceUserApiService.getDeptList().subscribe({
      next: (res) => {        
        //console.log(JSON.stringify(res))
        this.departmentList = res;
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

  fn_designationList() {

    this.waitingService.fn_showLoader()

    this.designationList = [];
    this.serviceUserApiService.getDesigList().subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.designationList = res;
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

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }



}




