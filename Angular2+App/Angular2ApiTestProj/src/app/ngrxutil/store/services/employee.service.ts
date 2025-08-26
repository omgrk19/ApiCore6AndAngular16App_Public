import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    //debugger;
    return this.http.get<any>(`https://localhost:7084/api/Employee`);
  }
}