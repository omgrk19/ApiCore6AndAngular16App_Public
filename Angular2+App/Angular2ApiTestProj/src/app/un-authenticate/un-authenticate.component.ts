import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-un-authenticate',
  templateUrl: './un-authenticate.component.html',
  styleUrls: ['./un-authenticate.component.css']
})
export class UnAuthenticateComponent {

  constructor(private router: Router){

  }


  f_loginAgain(){
    localStorage.clear();    
    this.router.navigate(["/"])
  }
}
