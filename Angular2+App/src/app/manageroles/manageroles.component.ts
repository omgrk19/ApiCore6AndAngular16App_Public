import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manageroles',
  templateUrl: './manageroles.component.html',
})
export class ManagerolesComponent implements OnChanges {
  faStatus: boolean = false
  fpaStatus: boolean = false
  path: string = "";

  constructor(private route: ActivatedRoute) {    

  }

  ngOnChanges(changes: SimpleChanges): void {
    // debugger
    let paths = this.route.snapshot.routeConfig?.path
  }

  fn_faStatus() {
    this.faStatus = true
    this.fpaStatus = false
  }
  fn_fpaStatus() {
    this.fpaStatus = true
    this.faStatus = false
  }

}
