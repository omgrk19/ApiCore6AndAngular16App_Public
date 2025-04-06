import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent {
  //@ViewChild('loaderBg') loaderBg!: ElementRef

  // fn_showLoader() {
  //   debugger
  //   //this.loaderBg.nativeElement.removeAttribute('style')
  //   document.getElementById('loaderBg')?.removeAttribute('style')
  // }

  // fn_hideLoader() {    
  //   let aa =  document.getElementById('loaderBg')
  //   if(aa){
  //     aa.style.display='none'
  //   }
  // }

  // fn_hideLoginLoader() {
  //   setTimeout(() => {
  //     this.loaderBg.nativeElement.style.display = 'none'
  //   }, 2000);
  // }

}
