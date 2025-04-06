import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { ModelComponent } from 'src/app/shared/model/model.component';

@Component({
  selector: 'app-UpdateUserImage',
  templateUrl: './UpdateUserImage.component.html',
  styleUrls: ['./UpdateUserImage.component.css']
})
export class UpdateUserImageComponent implements OnInit {
  pageTitle = "User List_Edit User Image"
  @ViewChild(ModelComponent) modelComponent!: ModelComponent

  userId: number = 0
  firstName: string = ""
  lastName: string = ""
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
    this.waitingService.fn_showLoader()

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
          this.isMaleorFemale = res.isMaleorFemale;
          this.birthDate = res.birthDate;
          this.createOn = res.createOn;
          this.modifieldOn = res.modifieldOn;
          this.isActive = res.isActive;
          this.photoUrl = res.photoUrl;
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
        this.fn_showModel(err.error, "error")
      },
      complete: () => {
        this.waitingService.fn_hideLoader()
      }

    });
  }

  changeImage(e: any, inputFile: File | null) {
    this.waitingService.fn_showLoader()
    ;
    const file: File = inputFile || e.target.files[0];
    let id: any = this.route.snapshot.paramMap.get('id');

    this.serviceUserApiService.uploadImageNew(id, file).subscribe({
      next: (res) => {
        console.log(res);
        let obj = JSON.parse(JSON.stringify(res));
        this.photoUrl = obj.path
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
      type: new FormControl("Image"),
      filePath: new FormControl(ImagePath),
    })

    this.serviceUserApiService.updateEmployeeFilePath(Number(userId), this.formGroupUserImageDataForm.value).subscribe({
      next: (res) => {
        console.log(res)
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


  fn_showModel(msg: string, typeMsg: string) {
    this.modelComponent.message = msg
    this.modelComponent.typeMsg = typeMsg
    this.modelComponent.fn_show_model()
  }


}
