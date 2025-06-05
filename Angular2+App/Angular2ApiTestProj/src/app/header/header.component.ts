import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('ulSiv1') ulSiv1!: ElementRef;
  @ViewChild('ulSiv2') ulSiv2!: ElementRef;

  @ViewChild('divNotification') divNotification!: ElementRef;
  @ViewChild('divNotification2') divNotification2!: ElementRef;
  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;

  mobToggler: boolean = true


  fn_MobNavLeft_toggle() {
    //debugger
    document.getElementById('mobile-collapse1')?.classList.toggle('on')
    document.getElementById('navDiv')?.classList.toggle('mob-open')
  }
  fn_mobToggler() {
    if (this.mobToggler) {
      this.ulSiv1.nativeElement.style.display = 'none'
      this.ulSiv2.nativeElement.style.display = 'block'
      this.mobToggler = false
    } else {
      this.ulSiv1.nativeElement.style.display = ''
      this.ulSiv2.nativeElement.style.display = 'none'
      this.mobToggler = true
    }
  }


  fn_dropdownToggle() {
    
    this.divNotification.nativeElement.classList.toggle('show')
    this.divNotification2.nativeElement.classList.toggle('show')

    if (this.divNotification.nativeElement.classList.contains('show')) {
      this.dropdownToggle.nativeElement.setAttribute('aria-expanded', 'true')
    } else {
      this.dropdownToggle.nativeElement.setAttribute('aria-expanded', 'false')
    }
  }

}
