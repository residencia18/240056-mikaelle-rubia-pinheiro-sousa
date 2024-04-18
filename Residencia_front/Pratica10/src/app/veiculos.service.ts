import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  subject = new Subject<any>();
  retornoJson: any;

  constructor() {}
}