import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterComponent } from './master.component';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentComponent } from './department/department.component';
import { ManageDesignationComponent } from './manage-designation/manage-designation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MasterComponent,
    DesignationComponent,
    DepartmentComponent,
    ManageDesignationComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class MasterModule { }
