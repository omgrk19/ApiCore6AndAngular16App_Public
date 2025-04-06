import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminChildrenGuard: CanActivateChildFn = (childRoute, state) => {
   
  let _router = inject(Router)
  let var1 = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('localkey'))))
  if (var1.userProfile === "Admin") {
    return true
  } else {
    _router.navigate(['/unauthorize'])
    return false
  }
  //return true;
};
