import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaitingService {

  constructor() { }

  //default loader
  fn_showLoader() {
    //show waiting
    document.getElementById('loaderBg')?.removeAttribute('style')
  }
  fn_hideLoader() {    
    //hide waiting
    let loaderBg = document.getElementById('loaderBg')
    if (loaderBg) {
      loaderBg.style.display = 'none'
    }
  }
  //default loader end


  //model loader
  // fn_showLoader() {
  //   //show waiting
  //   const modalElement = document.getElementById('loader-model');
  //   if (modalElement) {
  //     //$(modalElement).modal('show');
  //     modalElement.style.display = 'block'
  //   }
  // }
  // fn_hideLoader() {
    
  //   //hide waiting
  //   const modalElement = document.getElementById('loader-model');
  //   if (modalElement) {
  //     //$(modalElement).modal('hide');
  //     modalElement.style.display = 'block'
  //   }
  // }

  //model loader end

}
