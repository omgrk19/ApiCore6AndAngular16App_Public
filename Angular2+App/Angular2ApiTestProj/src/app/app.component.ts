import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { WaitingComponent } from './shared/waiting/waiting.component';
import { WaitingService } from './services/waiting.service';
// import * as $ from 'jquery';
// import 'bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apiTestProj';
  // @ViewChild('loaderBg') loaderBg!: ElementRef;    
  //@ViewChild(WaitingComponent) waitingComponent!: WaitingComponent

  constructor(public auth: AuthService, private waitingService: WaitingService) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      //this.loaderBg.nativeElement.style.display = 'none'
      this.waitingService.fn_hideLoader()
    }, 2000);
    //this.waitingComponent.fn_hideLoader()
  }

}
