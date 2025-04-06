import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    this.router.navigate(['employee','list'])
  }

}
