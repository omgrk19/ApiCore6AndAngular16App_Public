import { Pipe, PipeTransform } from '@angular/core';
import { fromEvent } from 'rxjs';

@Pipe({
  name: 'gender',
  pure: true,
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: string, gender: boolean): string {
    return `${(gender == true ? "Mr." : "Mrs.")} ${value}`;
  }

}
