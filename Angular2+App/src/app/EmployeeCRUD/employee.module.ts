import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { List2Component } from './list/list2.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { AddnewComponent } from './addnew/addnew.component';
import { UpdateUserImageComponent } from './UpdateUserImage/UpdateUserImage.component';
import { UpdateUserDocComponent } from './UpdateUserDoc/UpdateUserDoc.component';
import { UpdateUserVideoComponent } from './UpdateUserVideo/UpdateUserVideo.component';
import { SharedModule } from '../shared/shared.module';
import { GenderPipe } from '../pipes/gender.pipe';


@NgModule({
  declarations: [
    EmployeeComponent,     
    List2Component,
    ViewComponent,
    AddnewComponent,
    EditComponent,
    UpdateUserImageComponent,
    UpdateUserDocComponent,
    UpdateUserVideoComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    GenderPipe
  ]
})
export class EmployeeModule { 
  constructor(){
    console.log('EmployeeModule loaded')
  }
}
