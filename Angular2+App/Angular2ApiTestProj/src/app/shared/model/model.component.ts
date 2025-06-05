import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap';



@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  message: string = 'Hello World'
  typeMsg: string = 'success'
  //typeClass: any;
  typeClass = {
    'alert-success': false,
    'alert-danger': false,
  };

  constructor() {

  }







  // fn_show_model() {
  //   let msgModel = document.getElementById('messege-model')
  //   if (msgModel != null) {
  //     msgModel.classList.add('show')
  //     msgModel.style.display = 'block'
  //     msgModel.style.paddingRight = '17px'
  //     msgModel.style.backgroundColor = 'rgb(67 67 69 / 58%)'
  //     msgModel.style.transition = 'opacity .30s linear'
  //   }
  // }



  fn_show_model(): void {
    
    if (this.typeMsg === 'success') {
      this.typeClass = {
        'alert-success': true,
        'alert-danger': false,
      };
    }
    if (this.typeMsg === 'error') {
      this.typeClass = {
        'alert-success': false,
        'alert-danger': true,
      };
    }

    const modalElement = document.getElementById('messege-model');
    if (modalElement) {
      $(modalElement).modal('show');
    }
  }

  // fn_hide_model() {

  //   let msgModel = document.getElementById('messege-model')
  //   if (msgModel != null) {
  //     msgModel.classList.remove('show')
  //     msgModel.style.display = 'none'
  //   }
  // }

  // fn_hide_model() {
  //   this.myModal.nativeElement.modal('hide');
  // }


}
