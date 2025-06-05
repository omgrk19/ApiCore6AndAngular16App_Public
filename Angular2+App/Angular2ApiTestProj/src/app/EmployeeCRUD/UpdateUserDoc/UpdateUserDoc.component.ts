import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';

@Component({
  selector: 'app-UpdateUserDoc',
  templateUrl: './UpdateUserDoc.component.html',
  styleUrls: ['./UpdateUserDoc.component.css']
})
export class UpdateUserDocComponent implements OnInit {
  pageTitle = "User List_Edit User Document"
  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  userId: number = 0
  firstName: string = ""
  lastName: string = ""
  designationId: number = 0
  designationName: string = ""
  emailId = "";
  mobile = "";
  password = "";
  isMarried: boolean = false;
  gender: string = "";
  birthDate: Date = new Date();
  createOn = new Date();
  modifieldOn = new Date();
  isActive = false;
  // photoUrl = ""
  documentUrl = ""



  type = new FormControl<string>('', Validators.required);
  filePath = new FormControl<string>('', Validators.required);
  formGroupUserImageDataForm = new FormGroup({
    type: this.type,
    filePath: this.filePath,
  })


  constructor(private serviceUserApiService: ApiUserService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, private waitingService: WaitingService) {

  }

  ngOnInit(): void {
    ;
    let id: any = this.route.snapshot.paramMap.get('id');
    this.fn_FillData(id)
  }

  fn_FillData(uid: string) {

    // this.serviceUserApiService.getEmployeeList(0, 0, uid).subscribe(resp => {
    this.serviceUserApiService.getEmployeeList(0, 0, uid).subscribe({
      next: (resp) => {
        console.log("RKS:get:", JSON.stringify(resp));
        if (resp.employeeDetails_List.length > 0) {
          let res = resp.employeeDetails_List[0]
          // alert(res.firstName) ;
          this.userId = res.userId;
          this.firstName = res.firstName;
          this.lastName = res.lastName;
          this.designationId = res.designationId;
          this.designationName = res.designationName;
          this.emailId = res.emailId;
          this.mobile = res.mobile;
          this.password = res.password;
          this.isMarried = res.isMarried;
          this.gender = res.gender;
          this.birthDate = res.birthDate;
          this.createOn = res.createOn;
          this.modifieldOn = res.modifieldOn;
          this.isActive = res.isActive;
          // this.photoUrl = res.photoUrl;
          this.documentUrl = res.documentUrl;
        }
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

      }
    });

  }

  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }


  changeImage(e: any, inputFile: File | null) {
    this.waitingService.fn_showLoader()

    const file: File = inputFile || e.target.files[0];
    let id: any = this.route.snapshot.paramMap.get('id');

    // this.serviceUserApiService.uploadDocument(id, file).subscribe(res => {
    this.serviceUserApiService.uploadDocument(id, file).subscribe({
      next: (res) => {
        ;
        console.log(res);
        let obj = JSON.parse(JSON.stringify(res));
        // this.photoUrl = obj.path
        this.documentUrl = obj.path
        this.fn_UpdateImageData(id, obj.path)
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


  fn_UpdateImageData(userId: number, ImagePath: string) {
    ;

    this.formGroupUserImageDataForm = new FormGroup({
      type: new FormControl("Document"),
      filePath: new FormControl(ImagePath),
    })
        
    this.serviceUserApiService.updateEmployeeFilePath(Number(userId), this.formGroupUserImageDataForm.value).subscribe({
      next: (res) => {
        console.log(res)
        // window.location.reload()   //online is not working
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

      }
    })
  }


}
