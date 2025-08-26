import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { LoginComponent } from './login/login.component';
import { ListComponent } from './users/list/list.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
//import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { userCrudComponent } from './usersSinglePageCRUD/user-crud-folder/user-crud.component';
import { PageTitleComponent } from './page-title/page-title.component';
// import { List2Component } from './EmployeeCRUD/list/list2.component';
// import { ViewComponent } from './EmployeeCRUD/view/view.component';
// import { AddnewComponent } from './EmployeeCRUD/addnew/addnew.component';
// import { EditComponent } from './EmployeeCRUD/edit/edit.component';
// import { UpdateUserImageComponent } from './EmployeeCRUD/UpdateUserImage/UpdateUserImage.component';
// import { UpdateUserDocComponent } from './EmployeeCRUD/UpdateUserDoc/UpdateUserDoc.component';
// import { UpdateUserVideoComponent } from './EmployeeCRUD/UpdateUserVideo/UpdateUserVideo.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnAuthorizeComponent } from './un-authorize/un-authorize.component';
import { UnAuthenticateComponent } from './un-authenticate/un-authenticate.component';
import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './header/header.module';
import { GenderPipe } from './pipes/gender.pipe';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { ForesponseInterceptor } from './interceptors/foresponse.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { employeeReducer } from './ngrxutility/store/employee/employee.reducer';
import { EmployeeEffects } from './ngrxutility/store/employee/employee.effects';
import { DepartmentEffects } from './ngrxutility/store/department/department.effects';
import { departmentReducer } from './ngrxutility/store/department/department.reducer';
import { ManageDesignationEffects } from './ngrxutility/store/manageDesignation/manageDesignation.effects';
import { manageDesignationReducer } from './ngrxutility/store/manageDesignation/manageDesignation.reducer';
import { designationReducer } from './ngrxutility/store/designation/designation.reducer';
import { DesignationEffects } from './ngrxutility/store/designation/designation.effects';
import { ManageDesignationEmpEffects } from './ngrxutility/store/manageDesignationEmp/manageDesignationEmp.effects';
import { manageDesignationEmpReducer } from './ngrxutility/store/manageDesignationEmp/manageDesignationEmp.reducer';
// // import { ShowcouterComponent } from './ngrxutil/showcouter/showcouter.component';
// // import { CounterbuttonComponent } from './ngrxutil/showcouter/counterbutton/counterbutton.component';
// // import { CounterdisplayComponent } from './ngrxutil/showcouter/counterdisplay/counterdisplay.component';
// // import { counterReducer } from './ngrxutil/store/counter.reducer';
// import { EmployeeTestListComponent } from './ngrxutil/employee/employeetest.component';
// // import { rootReducer } from './ngrxutil/store/f-reducers';
// import { employeeReducer } from './ngrxutil/store/employee/employee.reducer';
// import { EmployeeEffects } from './ngrxutil/store/employee/employee.effects';



//import { ProfileComponent } from './header/profile/profile.component';


// import { TestmrModule } from './employeetest/testmr.module';
// import { EmployeeModule } from './EmployeeCRUD/employee.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    //HeaderComponent,
    LeftNavComponent,
    userCrudComponent,
    //List2Component,
    // ViewComponent,
    // AddnewComponent,
    // EditComponent,
    // UpdateUserImageComponent,
    // UpdateUserDocComponent,
    // UpdateUserVideoComponent,
    PageTitleComponent,
    RegistrationComponent,
    NotFoundComponent,
    UnAuthorizeComponent,
    UnAuthenticateComponent,    
    // ShowcouterComponent,
    // CounterbuttonComponent,
    // CounterdisplayComponent,
    //ProfileComponent
    // EmployeeTestListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //EmployeeModule, 
    //TestmrModule,   
    AppRoutingModule,
    SharedModule, 
    HeaderModule,
    GenderPipe,
    // StoreModule.forRoot({counter: counterReducer}),    
    // StoreModule.forRoot(rootReducer), 
    StoreModule.forRoot({ employees: employeeReducer, departments: departmentReducer,designations: designationReducer, 
      manageDesignations: manageDesignationReducer, manageDesignationEmps: manageDesignationEmpReducer}), 
    
    // EffectsModule.forRoot([]), 
    EffectsModule.forRoot([EmployeeEffects, DepartmentEffects, DesignationEffects, ManageDesignationEffects, ManageDesignationEmpEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })   
  ],  

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ForesponseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('AppModule loaded')
  }
}
