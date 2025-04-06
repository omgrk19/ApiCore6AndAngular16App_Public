import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestmrRoutingModule } from './testmr-routing.module';
import { Test2Component } from './test2/test2.component';
import { TestMrComponent } from './testmr.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TestMrComponent,
    Test2Component,
  ],
  imports: [
    CommonModule,
    TestmrRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TestmrModule {
  constructor() {
    console.log('TestmrModule loaded')
  }
}
