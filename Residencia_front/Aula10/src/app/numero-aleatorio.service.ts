import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumeroAleatorioService {

  subject = new Subject<number>();

  constructor() { 
    setInterval(()=>{
      this.subject.next(Math.floor(Math.random() *100) +1);
    },1000);
  }
}
