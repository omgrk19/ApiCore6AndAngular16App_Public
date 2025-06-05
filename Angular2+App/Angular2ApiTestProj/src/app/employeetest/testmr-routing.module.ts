import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test2Component } from './test2/test2.component';
import { TestMrComponent } from './testmr.component';
import { customChieldAuthenticationGuard } from '../authguard/custom-chield-authentication.guard';

const routes: Routes = [
  {
    path:'',
    component: TestMrComponent,
    canActivateChild:[customChieldAuthenticationGuard],
    children:[
      {
        path: 'test2mr',
        component: Test2Component   
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestmrRoutingModule { }
