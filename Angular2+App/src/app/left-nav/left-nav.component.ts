import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { timeInterval } from 'rxjs';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {
  @ViewChild('parent1') myParent1!: ElementRef
  @ViewChild('chield1') myChield1!: ElementRef
  //collapse nav
  @ViewChild('navDiv') navDiv!: ElementRef
  @ViewChild('mobileCollapse') mobileCollapse!: ElementRef

  

  navUserLink = false

  constructor(){

  }

  //close left nav
  fn_navClickOperation(){
    document.getElementById('mobile-collapse1')?.classList.remove('on')
    document.getElementById('navDiv')?.classList.remove('mob-open')
  }
  //navigate pages
  



  fn_chield_toggle1() {
    this.myParent1.nativeElement.classList.toggle('pcoded-trigger')
    if (this.myParent1.nativeElement.classList.contains('pcoded-trigger')) {
      this.myChield1.nativeElement.style.display = 'block'
    } else {
      this.myChield1.nativeElement.style.display = 'none'
    }
  }

  fn_mobileCollapse_toggle() {

    //document.getElementById('mobile-collapse1')?.classList.toggle('on')

    this.navDiv.nativeElement.classList.toggle('navbar-collapsed')
    this.mobileCollapse.nativeElement.classList.toggle('on')


    let element2 = document.getElementsByTagName("body");
    for (let i = 0; i < element2.length; i++) {
      element2[i].classList.toggle("navbar-collapsed");
    }

    // Select all <p> elements
    let elements = document.getElementsByTagName("app-left-nav");
    // Loop through each element and toggle the class
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("navbar-collapsed");
    }

  }



}
