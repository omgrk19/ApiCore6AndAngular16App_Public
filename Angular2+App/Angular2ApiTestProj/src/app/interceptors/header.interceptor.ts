import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //debugger;
    console.log("Interceptor-log: " + request.url)

    if (localStorage.length > 0) {
 
      var data = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('localkey'))))
      let auth_token = data.token;

      // const hdr = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${auth_token}`
      // });


      let imgSt: boolean = this.checkImageInRequest(request);

      let hdr: any
      if (imgSt === true) {
        hdr = {
          'Authorization': `Bearer ${auth_token}`
        };
      } else {
        hdr = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        };
      }

      const apikey = ""
      const req = request.clone({
        setHeaders: (
          hdr
        )
      })

      return next.handle(req);
    }

    return next.handle(request);
  }

  checkImageInRequest(req: HttpRequest<unknown>): boolean {
    if (req.body instanceof FormData) {
      const formData = req.body as FormData;
      const imageFile = formData.get('image'); // 'image' is the field name



      if (imageFile instanceof File) {
        console.log('Image found:', imageFile.name, imageFile.type, imageFile.size);

        // Optionally check if it's really an image
        if (imageFile.type.startsWith('image/')) {
          console.log('It is an image file.');
          return true;
        } else {
          console.log('Not an image file.');
        }
      } else {
        console.log('No file found in "image" field.');
      }
      return true;
    } else {
      console.log('Request body is not FormData.');
    }
    return false;
  }

}
