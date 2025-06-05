import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelComponent } from './model/model.component';
import { WaitingComponent } from './waiting/waiting.component';



@NgModule({
  declarations: [
    InputComponent,
    ModelComponent,
    WaitingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
    ModelComponent,
    WaitingComponent
  ]
})
export class SharedModule { }
