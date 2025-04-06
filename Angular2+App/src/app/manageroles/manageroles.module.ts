import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerolesRoutingModule } from './manageroles-routing.module';
import { ManagerolesComponent } from './manageroles.component';
import { AuthActionComponent } from './auth-action/auth-action.component';
import { AuthFormsComponent } from './auth-forms/auth-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageFormActionComponent } from './manage-form-action/manage-form-action.component';
import { ManageProfileFormActionComponent } from './manage-profile-form-action/manage-profile-form-action.component';
import { ManageUserProfileFormActionComponent } from './manage-user-profile-form-action/manage-user-profile-form-action.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManagerolesComponent,
    AuthActionComponent,
    AuthFormsComponent,
    ManageFormActionComponent,
    ManageProfileFormActionComponent,
    ManageUserProfileFormActionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManagerolesRoutingModule,
    SharedModule,
  ]
})
export class ManagerolesModule { }
