import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  f_isLoggedIn():boolean{
    //debugger
    if(localStorage.length>0){
      return true
    }else{
      return false
    }
  }

  abc(){
    // localStorage.setItem('localkey','')
    // localStorage.setItem('localkey','')
    // sessionStorage.setItem('sessionkey','')
    // sessionStorage.getItem('sessionkey')
  }

}
