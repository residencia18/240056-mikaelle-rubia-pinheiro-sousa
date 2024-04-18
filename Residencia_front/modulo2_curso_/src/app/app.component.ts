import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'modulo2_curso_';
  constructor(private primeNgConfig: PrimeNGConfig){}

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}
