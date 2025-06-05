import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerolesComponent } from './manageroles.component';
import { AuthActionComponent } from './auth-action/auth-action.component';
import { AuthFormsComponent } from './auth-forms/auth-forms.component';
import { ManageFormActionComponent } from './manage-form-action/manage-form-action.component';
import { ManageProfileFormActionComponent } from './manage-profile-form-action/manage-profile-form-action.component';
import { ManageUserProfileFormActionComponent } from './manage-user-profile-form-action/manage-user-profile-form-action.component';
import { customAuthenticationGuard } from '../authguard/custom-authentication.guard';
import { adminChildrenGuard } from '../authguard/admin-children.guard';


const routes: Routes = [
  {
    path: '',
    component: ManagerolesComponent,
    canActivateChild: [adminChildrenGuard],
    children: [
      // {
      //   path:'action',
      //   component: AuthActionComponent
      // },
      // {
      //   path: 'forms',
      //   component: AuthFormsComponent
      // },                
      {
        path: 'form-action',
        component: ManageFormActionComponent
      },
      {
        path: 'profile-form-action',
        component: ManageProfileFormActionComponent
      },
      {
        path: 'user-profile-form-action',
        component: ManageUserProfileFormActionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerolesRoutingModule { }
