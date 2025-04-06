import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const customChieldAuthenticationGuard: CanActivateChildFn = (childRoute, state) => {
  
  let _router = inject(Router)
  if (localStorage.length > 0) {
    return true
  } else {
    //alert('You are not authenticated.')
    _router.navigate(['/unauthenticate'])
    return false
  }
  // return true;
};
