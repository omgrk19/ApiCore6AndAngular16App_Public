import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  pageTitle = "User List_View User"

  userId: number = 0
  firstName: string = ""
  lastName: string = ""
  departmentId: number = 0
  departmentName: string = ""
  designationId: number = 0
  designationName: string = ""
  emailId = "";
  mobile = "";
  password = "";
  isMaleorFemale: boolean = false;
  birthDate: Date = new Date();
  createOn = new Date();
  modifieldOn = new Date();
  isActive = false;
  photoUrl = ""
  videoUrl = ""
  documentUrl = ""

  constructor(private serviceUserApiService: ApiUserService, private route: ActivatedRoute,private router: Router) {

  }

  ngOnInit(): void {
    let id: any = this.route.snapshot.paramMap.get('id');
    this.userId = id
    this.fn_FillData(id)
  }


  fn_FillData(uid: string) {

    this.serviceUserApiService.getEmployeeList(0, 0, uid).subscribe(resp => {
      ;
      console.log("RKS:get:", JSON.stringify(resp));
      if (resp.employeeDetails_List.length > 0) {
        let res = resp.employeeDetails_List[0]
        // alert(res.firstName) ;
        this.userId = res.userId;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.designationId = res.designationId;
        this.designationName = res.designationName;
        this.departmentId = res.departmentId;
        this.departmentName = res.departmentName;
        this.emailId = res.emailId;
        this.mobile = res.mobile;
        this.password = res.password;
        this.isMaleorFemale = res.isMaleorFemale;
        this.birthDate = res.birthDate;
        this.createOn = res.createOn;
        this.modifieldOn = res.modifieldOn;
        this.isActive = res.isActive;
        this.photoUrl = res.photoUrl;
        this.videoUrl = res.videoUrl;
        this.documentUrl = res.documentUrl;
      }
    });
  }


  fn_NavigateToList() {
    
    // this.router.navigate(['/','userlist2',uid],{
    this.router.navigate(['/employee','list'],{
      relativeTo: this.route
    })
  }

  fn_DeleteRecord(uid: number) {
    ;
    if(!confirm("Are you sure to delete record?")){
      return;
    }  
    
    //start waiting cursor
    document.body.style.cursor = 'wait'

    this.serviceUserApiService.deleteEmployee(uid).subscribe(res => {
      
      //desable waiting cursor
      document.body.style.cursor = 'default'

      this.router.navigate(['/employee','list'],{
        relativeTo: this.route,
        // queryParams: {
        //  id: uid
        // }
      })
    });
  }


}
