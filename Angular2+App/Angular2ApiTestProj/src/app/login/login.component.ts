import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiUserService } from '../services/api-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl<string | null>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', Validators.required);


  errorMessage: string = ''
  loginMsg: any = ''
  loginStatus: boolean = false;

  formGroupUserLoginForm = new FormGroup({
    email: this.email,
    password: this.password
  })

  constructor(private serviceUserApiService: ApiUserService, private formBhuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(x => {
      // console.log('rkMsg: '+x.get('msg'));
      this.loginMsg = x.get('msg');
      this.loginStatus = Boolean(x.get('status'));
    })
  }

  fn_UserLogin() {
    ;
    document.body.style.cursor = 'wait'

    document.getElementById("btnLogin")!.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;


    this.serviceUserApiService.UserLogin(this.formGroupUserLoginForm.value).subscribe({
      next: (res) => {
        ;
        console.log("RKS:Post:", JSON.stringify(res));
        localStorage.setItem('localkey', JSON.stringify(res))
        // localStorage.removeItem('localkey')
        // localStorage.clear()
        document.body.style.cursor = 'default'
        //this.router.navigate(['/'])
        location.href = "/";
      },
      error: (err) => {
        
        // this.loginMsg = err.message
        document.body.style.cursor = 'default'
        this.loginMsg = "Invalid credential"
        this.loginStatus = false;
        console.error('Login failed', err);

        document.getElementById("btnLogin")!.innerHTML = 'Login'
      },
      complete: () => {
        document.body.style.cursor = 'default'
        this.loginStatus = true;
      }


    });

    //   try {
    //     // this.serviceUserApiService.UserLogin(this.formGroupUserLoginForm.value).subscribe(res => {
    //     //   ;
    //     //   console.log("RKS:Post:", JSON.stringify(res));
    //     //   localStorage.setItem('localkey', JSON.stringify(res))
    //     //   // localStorage.removeItem('localkey')
    //     //   // localStorage.clear()
    //     //   document.body.style.cursor = 'default'
    //     //   //this.router.navigate(['/'])
    //     //   location.href = "/";
    //     // });
    // } catch (e) {
    // }

  }



}
