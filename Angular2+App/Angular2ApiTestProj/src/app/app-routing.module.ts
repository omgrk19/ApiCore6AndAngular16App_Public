import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './users/list/list.component';
// import { List2Component } from './EmployeeCRUD/list/list2.component';
// import { ViewComponent } from './EmployeeCRUD/view/view.component';
import { userCrudComponent } from './usersSinglePageCRUD/user-crud-folder/user-crud.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
// import { AddnewComponent } from './EmployeeCRUD/addnew/addnew.component';
// import { EditComponent } from './EmployeeCRUD/edit/edit.component';
// import { UpdateUserImageComponent } from './EmployeeCRUD/UpdateUserImage/UpdateUserImage.component';
// import { UpdateUserDocComponent } from './EmployeeCRUD/UpdateUserDoc/UpdateUserDoc.component';
// import { UpdateUserVideoComponent } from './EmployeeCRUD/UpdateUserVideo/UpdateUserVideo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnAuthorizeComponent } from './un-authorize/un-authorize.component';
import { UnAuthenticateComponent } from './un-authenticate/un-authenticate.component';
import { customAuthenticationGuard } from './authguard/custom-authentication.guard';
// import { ShowcouterComponent } from './ngrxutil/showcouter/showcouter.component';
// import { EmployeeTestListComponent } from './ngrxutil/employee/employeetest.component';



const routes: Routes = [  
  {
    path:'',
    component: HomeComponent
  },  
  // {
  //   path:'testmr2',
  //   redirectTo: '/testmr',
  //   pathMatch:'full'
  // },
  // {
  //   path:'employee-list',
  //   redirectTo: '/employee/list',
  //   pathMatch:'full'
  // },
  
  // {
  //   path:'showcounter',
  //   component: ShowcouterComponent
  // },
  // {
  //   path:'employeetest',
  //   component: EmployeeTestListComponent
  // },
  {
    path:'testmr',
    loadChildren:()=> import('./employeetest/testmr.module').then(m => m.TestmrModule),
  },
  {
    path:'employee',
    loadChildren:()=> import('./EmployeeCRUD/employee.module').then(m => m.EmployeeModule)
  },
  // {
  //   path:'designation',
  //   loadChildren:()=> import('./designation/designation.module').then(x => x.DesignationModule)
  // },
  {
    path:'masters',
    loadChildren:()=> import('./masters/master.module').then(x => x.MasterModule)
  },
  {
    path:'manageroles',
    loadChildren:()=> import('./manageroles/manageroles.module').then(x => x.ManagerolesModule)
  },
  {
    path:'login',
    component: LoginComponent
  },
 
  {
    path:'userlist',
    component: ListComponent,
    canActivate: [customAuthenticationGuard]
  },
  {
    path:'user-crud',
    component: userCrudComponent,
    canActivate: [customAuthenticationGuard]
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },  
  {
    path:'unauthenticate',
    component: UnAuthenticateComponent
  },
  {
    path:'unauthorize',
    component: UnAuthorizeComponent
  },
  {
    path:'**',
    component: NotFoundComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
