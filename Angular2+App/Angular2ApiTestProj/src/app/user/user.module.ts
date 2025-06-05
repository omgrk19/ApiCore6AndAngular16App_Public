import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../header/profile/profile.component';



@NgModule({
  declarations: [    
    ProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProfileComponent
  ]
})
export class UserModule { 
  constructor(){
    console.log('UserModule loaded')
  }
}
