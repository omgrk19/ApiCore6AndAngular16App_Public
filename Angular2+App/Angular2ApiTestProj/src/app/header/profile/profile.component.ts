import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/api-user.service';
import { ProfileToHomeService } from 'src/app/services/profile-to-home.service';
import { WaitingService } from 'src/app/services/waiting.service';
import { WaitingComponent } from 'src/app/shared/waiting/waiting.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('divSetting') divSetting!: ElementRef;
  @ViewChild('divSetting2') divSetting2!: ElementRef;
  @ViewChild('dropdownToggle2') dropdownToggle2!: ElementRef;

  //waiting loader
  @ViewChild(WaitingComponent) waitingComponent!: WaitingComponent



  showUploadStatus: boolean = false
  userName: string = ''
  photoUrl: string = '../assets/images/user/avatar-1.jpg'


  type = new FormControl<string>('', Validators.required);
  filePath = new FormControl<string>('', Validators.required);
  formGroupUserImageDataForm = new FormGroup({
    type: this.type,
    filePath: this.filePath,
  })



  constructor(private router: Router, private serviceUserApiService: ApiUserService,
    private profileToHomeService: ProfileToHomeService, private waitingService: WaitingService
  ) {

  }

  fn_dropdownToggle2() {

    this.divSetting.nativeElement.classList.toggle('show')
    this.divSetting2.nativeElement.classList.toggle('show')

    if (this.divSetting.nativeElement.classList.contains('show')) {
      this.dropdownToggle2.nativeElement.setAttribute('aria-expanded', 'true')
    } else {
      this.dropdownToggle2.nativeElement.setAttribute('aria-expanded', 'false')
    }
  }

  ngOnInit(): void {

    let var1 = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('localkey'))))
    this.userName = var1.userName
    if (var1.photo == undefined || var1.photo == '') {
      this.photoUrl = this.photoUrl
    } else {
      this.photoUrl = var1.photo
    }
    this.showUploadStatus = false
  }

  f_logout() {

    localStorage.clear();
    this.router.navigate(["/"])
  }

  f_changeImage(e: any, inputFile: File | null) {
    //debugger

    //show waiting loader
    //this.waitingComponent.fn_showLoader()
    this.waitingService.fn_showLoader()

    const file: File = inputFile || e.target.files[0];

    this.serviceUserApiService.uploadImageUser(file).subscribe(res => {

      console.log(res);
      let obj = JSON.parse(JSON.stringify(res));
      //this.photoUrl = obj.path
      this.fn_UpdateImageData(obj.path)

      this.waitingService.fn_hideLoader()

    })


    //hide waiting loader
    //this.waitingComponent.fn_hideLoader()
    

  }

  fn_UpdateImageData(ImagePath: string) {

    this.waitingService.fn_showLoader()

    this.formGroupUserImageDataForm = new FormGroup({
      type: new FormControl("Image"),
      filePath: new FormControl(ImagePath),
    })

    this.serviceUserApiService.updateUserFilePath(this.formGroupUserImageDataForm.value).subscribe(res => {

      console.log(res)
      //passing photo own component
      this.photoUrl = ImagePath

      //passing photo url into home component
      this.profileToHomeService.setData({ message: ImagePath })

      let var1 = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('localkey'))))
      var1.photo = ImagePath
      localStorage.setItem('localkey', JSON.stringify(var1))

      this.waitingService.fn_hideLoader()
    })

  }

  fn_ChangeStatus() {

    // if (this.showUploadStatus) {
    //   this.showUploadStatus = false
    // } else {
    //   this.showUploadStatus = true
    // }
    this.showUploadStatus = true
  }
  fn_ChangeStatusHide() {
    this.showUploadStatus = false
  }


}
