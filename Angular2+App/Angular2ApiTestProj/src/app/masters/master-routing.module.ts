import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { ManageDesignationComponent } from './manage-designation/manage-designation.component';

const routes: Routes = [
  {
    path:'',
    component:MasterComponent,
    children:[
      {
        path:'department',
        component: DepartmentComponent
      },
      {
        path: 'designation',
        component: DesignationComponent
      },                
      {
        path: 'manage-designation',
        component: ManageDesignationComponent
      },                
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
