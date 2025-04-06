import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
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
    
    
    //ProfileComponent
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
    GenderPipe   
  ],  

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('AppModule loaded')
  }
}
