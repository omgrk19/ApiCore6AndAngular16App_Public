import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { List2Component } from './list/list2.component';
import { AddnewComponent } from './addnew/addnew.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { UpdateUserImageComponent } from './UpdateUserImage/UpdateUserImage.component';
import { UpdateUserDocComponent } from './UpdateUserDoc/UpdateUserDoc.component';
import { UpdateUserVideoComponent } from './UpdateUserVideo/UpdateUserVideo.component';
import { customChieldAuthenticationGuard } from '../authguard/custom-chield-authentication.guard';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivateChild: [customChieldAuthenticationGuard],
    children: [
      {
        path: 'list',
        component: List2Component
      },
      {
        path: 'add',
        component: AddnewComponent
      },
      {
        path: 'view/:id',
        component: ViewComponent
      },
      {
        path: 'edit/:id',
        component: EditComponent
      },
      {
        path: 'UpdateImage/:id',
        component: UpdateUserImageComponent
      },
      {
        path: 'UpdateDoc/:id',
        component: UpdateUserDocComponent
      },
      {
        path: 'UpdateVideo/:id',
        component: UpdateUserVideoComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
