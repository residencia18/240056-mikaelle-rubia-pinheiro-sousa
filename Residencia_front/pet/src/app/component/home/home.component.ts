import { Component } from '@angular/core';
import { Petshop } from '../../petshop.model';
import {DataBaseService } from '../../data-base.service';
import { FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  clientePet : Petshop [] = [];
  constructor(private petshotService: DataBaseService ) { }

  ngOnInit() {
    this.getPetshot_();


  }
  getPetshot_():void{
    this.petshotService.getPetshot().subscribe({
      next:(responseData)=>{
        this.clientePet = responseData
        console.log("...."+this.clientePet);
      },
      error:(error)=>console.log(error)
    })
  }

}
