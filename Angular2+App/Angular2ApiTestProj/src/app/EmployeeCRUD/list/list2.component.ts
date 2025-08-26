import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';

@Component({
  selector: 'app-list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.css'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class List2Component implements OnInit {
  pageTitle = "User List"

  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  @ViewChild("tvFirstName") _tvFirstName!: ElementRef
  @ViewChild("tv_btn_save") _tv_btn_save!: ElementRef
  btn_save_text = 'Add New'

  birthDate2 = new Date();

  userList: any = [];
  deptList: any = [];
  desigList: any = [];

  pageQty: number = 0;
  dispPageQty: number = 3;
  pageSize: number = 5;
  //pageSize = new FormControl(5);
  pageNo: number = 1;
  startPageNo: number = 1;
  endPageNo: number = 1;

  userId = new FormControl(0);
  firstName = new FormControl<string>('', Validators.required);
  lastName = new FormControl<string>('');
  departmentId = new FormControl<number | null>(0);
  designationId = new FormControl<number | null>(0);
  emailId = new FormControl<string | null>('');
  mobile = new FormControl<string | null>('');
  password = new FormControl<string>('', Validators.required);
  isMaleorFemale = new FormControl<boolean>(false);
  birthDate = new FormControl<Date | null>(new Date);
  createOn = new FormControl<Date | null>(new Date());
  modifieldOn = new FormControl<Date | null>(new Date());
  isActive = new FormControl<boolean>(false, Validators.required);

  formGroupUserFilterForm = new FormGroup({
    // userId: this.userId,
    firstName: this.firstName,
    // lastName: this.lastName,
    departmentId: this.departmentId,
    designationId: this.designationId,
    // emailId: this.emailId,
    mobile: this.mobile,
    // isMaleorFemale: this.isMaleorFemale,
    // birthDate: this.birthDate,
    // createOn: this.createOn,
    // modifieldOn: this.modifieldOn,
    // isActive: this.isActive,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private waitingService: WaitingService, private cdr: ChangeDetectorRef) {

  }

  
  ngOnInit(): void {
    this.fn_loadData();     
  }

  fn_loadData() {
    this.fn_deptList();
    this.fn_UserList(this.pageNo);
  }

  fn_fiterUserList() {
    let firstName = this.formGroupUserFilterForm.value.firstName
    let mobile = this.formGroupUserFilterForm.value.mobile
    let designationId = this.formGroupUserFilterForm.value.designationId

    this.pageNo = 1
    this.fn_UserList(this.pageNo, 0, designationId, firstName, mobile);
  }

  fn_PageSizeChange(pageSz: any) {
    this.pageSize = pageSz.target.value
    this.pageNo = 1
    this.fn_UserList(this.pageNo);
  }

  fn_PageChange(pageNo: number) {
    
    pageNo = (pageNo < 1 ? 1 : pageNo > this.pageQty ? this.pageQty : pageNo);

    // this.startPageNo = 

    this.fn_UserList(pageNo);
  }

  fn_deptList() {
    this.waitingService.fn_showLoader()

    this.deptList = [];
    this.serviceUserApiService.getDeptList().subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.deptList = res;
      },
      error: (err) => {

        this.waitingService.fn_hideLoader()
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
      },
      complete: () => {
        document.body.style.cursor = 'default'
        this.waitingService.fn_hideLoader()
      }
    })
  }

  fn_desigList(departmentId: string = "") {
    this.waitingService.fn_showLoader()

    this.desigList = [];
    this.serviceUserApiService.getManageDesignationWithPage(1, 100, 0, departmentId).subscribe({
      next: (res) => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.desigList = res;
      },
      error: (err) => {

        this.waitingService.fn_hideLoader()
        if (err.status === 403) {
          this.router.navigateByUrl(`/unauthorize`)
        }
        if (err.status === 401) {
          this.router.navigateByUrl(`/unauthenticate`)
        }
      },
      complete: () => {
        this.waitingService.fn_hideLoader()
      }
    })
  }

  fn_UserList(pageNo: number, id: any = 0, departmentId: any = 0, designationId: any = 0, firstName: any = "", mobile: any = "") {

    this.waitingService.fn_showLoader()
    this.userList = [];
    this.serviceUserApiService.getEmployeeList(pageNo, this.pageSize, id, departmentId, designationId, firstName, mobile).subscribe({
      next: (res) => {

        console.log("RKS:", JSON.stringify(res));        
        // this.userList = res.usersDetails_List;
        this.userList = res.employeeDetails_List;
        let totalRecords = Number(res.totalRecords);
        this.pageNo = pageNo;
        this.fn_Paging(totalRecords);
        this.btn_save_text = 'Add New' 

        this.cdr.detectChanges()
      },
      error: (err) => {

        this.waitingService.fn_hideLoader()
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
        this.waitingService.fn_hideLoader()
      }
    })


  }

  fn_Paging(totalRecords: number) {
    this.pageQty = Math.ceil(totalRecords / this.pageSize);
  }


  fn_DeleteRecord(uid: number) {
    if (!confirm("Are you sure to delete record?")) {
      return;
    }

    // this.serviceUserApiService.deleteUser(uid).subscribe(res => {
    //   this.fn_UserList(this.pageNo);
    // });
    this.waitingService.fn_showLoader()
    this.serviceUserApiService.deleteEmployee(uid).subscribe({
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
    });
  }

  f_createnew() {
    this.router.navigate(['/employee', 'add'], {
      relativeTo: this.route
    })
  }

  fn_NavigateToView(uid: number) {
    this.router.navigate(['/employee', 'view', uid], {
      relativeTo: this.route
    })
  }

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }

}
