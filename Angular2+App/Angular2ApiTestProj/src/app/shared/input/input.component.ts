import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl()
  @Input() type = ""
  @Input() placeholder = ""
  @Input() elementId = ""
 

  // @ViewChild('childInput') childInput!: ElementRef<HTMLInputElement>;

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

  fn_focus(eleId: string) {
    
    const element = document.getElementById(eleId);
    if (element) {
      element.focus();
    }
    //this.childInput.nativeElement.focus();
  }


}
