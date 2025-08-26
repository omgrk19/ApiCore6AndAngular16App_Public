import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as EmployeeActions from '../store/employee/employee.actions';
import {
    selectEmployees,
    selectEmployeesInfo
    //, selectLimit, selectLoading, selectPage, selectTotal 
} from '../store/employee/employee.selectors';
import { Observable } from 'rxjs';
import { tEmployee } from '../store/models/t-employee.models';
import { EmployeeState } from '../store/employee/employee.state';





@Component({
    selector: 'app-employee-test-list',
    template: `
    <div *ngIf="!employeeInfo.error">
    <ol>
      <li *ngFor="let emp of employeeInfo.employeeDetails_List">{{ emp.firstName }} - {{ emp.lastName }}</li>
    </ol> 
    </div>
    <div *ngIf="employeeInfo.loading">RK Loading...</div>
    <div *ngIf="employeeInfo.error">{{ employeeInfo.error }}</div>
    `,
    // providers: [EmployeeRepo],
})
export class EmployeeTestListComponent implements OnInit {

    // employees$!: Observable<any>;
    // page$!: Observable<any>;
    // limit$!: Observable<any>;
    // total$!: Observable<any>;
    // loading$!: Observable<any>;

    //employees$ = this.store.select(selectEmployees);
    // page$ = this.store.select(selectPage);
    // limit$ = this.store.select(selectLimit);
    // total$ = this.store.select(selectTotal);
    // loading$ = this.store.select(selectLoading);




    employees: tEmployee[] = [];
    employeeInfo!: EmployeeState;
    errorMessage: string = '';

    constructor(private store: Store) {


    }

    ngOnInit(): void {
        //debugger;
        // this.fetchData();
        this.loadPage(1);
    }

    // fetchData() {

    //     const employeeData$ = this.empRepo.getEmployeeList()[1];
    //     employeeData$.subscribe(data => {
    //         debugger;
    //         console.log(data);
    //         this.employees = data;
    //     });
    // }

    loadPage(page: number) {

        this.store.dispatch(EmployeeActions.loadEmployeesRequest({ page, limit: 10 }));

        // this.store.select(selectEmployees).subscribe(item =>{
        this.store.select(selectEmployeesInfo).subscribe(item => {
            //this.employees = item;
            this.employeeInfo = item;
            console.log('Employees: ', this.employees);
        });


    }

    nextPage(currentPage: number) {
        this.loadPage(currentPage + 1);
    }

    prevPage(currentPage: number) {
        this.loadPage(currentPage - 1);
    }
}