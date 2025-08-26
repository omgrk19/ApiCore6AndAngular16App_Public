import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseUrlService {
  //public baseUrl: string = "https://localhost:7084/api";
  public baseUrl: string = "https://apiforangulartest.omss.in/api";  
  //public baseUrl: string = "https://apiforangulartest.omss.info/api";  
  //public baseUrl: string = "https://apiforangulartest.omss.life/api";  
  //public baseUrl: string = "https://apiforangulartest.nppnp.com/api";
  //public baseUrl: string = "https://oov2kzxfkbjwwxpqs2hphuiljy0gbdcp.lambda-url.us-east-1.on.aws/api";  
  //public baseUrl: string = "https://ec2-65-0-139-192.ap-south-1.compute.amazonaws.com/api";  
}

