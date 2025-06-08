import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../services/api-user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordComplexityValidator } from '../services/passwordComplexityValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email = new FormControl<string | null>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required, passwordComplexityValidator()]);
  confirmPassword = new FormControl<string>('', Validators.required);
  role = new FormControl<string>('', Validators.required);
  loginStatus = new FormControl<boolean>(false, Validators.required);

  regMsg: any = ''
  regStatus: boolean = false;

  formGroupUserLoginForm = new FormGroup({
    email: this.email,
    password: this.password
  })

  formGroupUserRegisterForm = new FormGroup({
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    role: this.role,
    loginStatus: this.loginStatus,
  },{
    validators: this.passwordsMatchValidator
  })

  constructor(private serviceUserApiService: ApiUserService, private formBhuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {

  }

  // Custom Validator
  passwordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {    
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(x => {
      // console.log('rkMsg: '+x.get('msg'));
      this.regMsg = x.get('msg');
      this.regStatus = Boolean(x.get('status'));
    })
  }

  fn_UserRegister() {

    document.getElementById("btnSignUp")!.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

    if(this.formGroupUserRegisterForm.value.password !== this.formGroupUserRegisterForm.value.confirmPassword){
      document.getElementById("btnSignUp")!.innerHTML = `Sign up Now`;
      this.regStatus = false;
      this.regMsg = "Password and Confirm Password should be same."
      return;
    }

    debugger;
    document.body.style.cursor = 'wait'
    this.serviceUserApiService.UserRegister(this.formGroupUserRegisterForm.value).subscribe({
      next: (res) => {
        debugger

        if (res.status) {
          this.regStatus = true
          this.regMsg = res.msg
          if (this.formGroupUserRegisterForm.value.loginStatus) {
            localStorage.setItem('localkey', JSON.stringify(res))
            //this.router.navigate(['/'])            
            location.href = "/";
          } else {
            this.regMsg = res.msg
          }
        } else {
          this.regStatus = false;
          this.regMsg = res.msg
        }
      },
      error: (err) => {
        debugger
        // this.loginMsg = err.message
        document.body.style.cursor = 'default'
        this.regStatus = false;
        // this.regMsg = `This ${this.formGroupUserRegisterForm.value.email} email id already exists.`
        this.regMsg = err.message
        console.error('Login failed', err);
        document.getElementById("btnSignUp")!.innerHTML = `Sign up Now`;
      },
      complete: () => {
        document.body.style.cursor = 'default'        
        document.getElementById("btnSignUp")!.innerHTML = `Sign up Now`;
      }


    });
    //-------



  }

}
