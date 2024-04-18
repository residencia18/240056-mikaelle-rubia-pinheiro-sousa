import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTeste'
})
export class PipeTestePipe implements PipeTransform {
  
  transform(value: string){

    return value.split(' ').slice(0, 2).join('-') + '....!!!';
  }

}
