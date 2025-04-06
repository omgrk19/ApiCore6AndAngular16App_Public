import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-un-authorize',
  templateUrl: './un-authorize.component.html',
  styleUrls: ['./un-authorize.component.css']
})
export class UnAuthorizeComponent {
  message: string = ''
  errorSt = false
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(prm => {

      this.message = prm['msg']
      if (this.message !== undefined && this.message !== '') {
        this.errorSt = true
      }    

    })
  }



}
