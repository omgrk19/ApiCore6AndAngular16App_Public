import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApiUserService } from '../services/api-user.service';
import { ProfileComponent } from '../header/profile/profile.component';
import { Router } from '@angular/router';
import { ProfileToHomeService } from '../services/profile-to-home.service';
import { WaitingService } from '../services/waiting.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle: string = "Home"

  userList: any = [];
  desigList: any = [];
  totalDesignation: number = 0;
  totalUsers: number = 0;
  userName: string = ''
  photoUrl: string = '../assets/images/user/avatar-1.jpg'

  @ViewChild(ProfileComponent) pro: any

  constructor(private serviceUserApiService: ApiUserService, private router: Router,
    private profileToHomeService: ProfileToHomeService, private waitingService: WaitingService
  ) {

  }




  ngOnInit(): void {

    this.fn_top10Users()
    this.fn_desigList()

    let var1 = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('localkey'))))
    this.userName = var1.userName
    if (var1.photo == undefined || var1.photo == '') {
      this.photoUrl = this.photoUrl
    } else {
      this.photoUrl = var1.photo
    }

    this.profileToHomeService.data$.subscribe(dt => {

      if (dt != null) {
        this.photoUrl = dt.message
      }
    })

  }

  fn_top10Users() {
    // document.body.style.cursor = 'wait'
    this.waitingService.fn_showLoader()

    this.userList = [];
    this.serviceUserApiService.getEmployeeList(1, 10, 0, 0, "", "").subscribe({
      next: (res) => {
        // console.log("RKS:", JSON.stringify(res));        
        this.userList = res.employeeDetails_List;
        this.totalUsers = Number(res.totalRecords);
      },
      error: (err) => {
        // document.body.style.cursor = 'default'
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


  fn_desigList() {
    this.waitingService.fn_showLoader()
    this.desigList = [];
    this.serviceUserApiService.getDesigList().subscribe({
      next: (res) => {
        // console.log("RKS:Desig:", JSON.stringify(res));        
        this.desigList = res;
        this.totalDesignation = this.desigList.length
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



}
