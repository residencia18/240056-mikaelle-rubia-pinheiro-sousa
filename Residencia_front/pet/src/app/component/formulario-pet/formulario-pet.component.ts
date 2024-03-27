import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators,} from '@angular/forms';
import {DataBaseService } from '../../data-base.service';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-formulario-pet',
  templateUrl: './formulario-pet.component.html',
  styleUrl: './formulario-pet.component.css'
})
export class FormularioPetComponent  implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();

  clientePetForm!: FormGroup;
  fOnFocus:Boolean = false;
  fonChange:Boolean = false;
  nomeTutor: string = '';
  nomeAnimal: string = '';
  idade: number = 0;
  raca: string = '';
  historico: string = '';
  peso: number = 0;
  constructor(private formConstrutor: FormBuilder, private petshotService: DataBaseService ) { }

  ngOnInit() {
    this.clientePetForm = this.formConstrutor.group({
      nomeTutor: ['', Validators.required],
      nomeAnimal: ['', Validators.required],
      idade: ['', Validators.required],
      raca: ['', Validators.required],
      historico: ['', Validators.required],
      peso: ['', Validators.required]
    });

  }


  onSubmit() {
    console.log(this.clientePetForm.value);
    this.petshotService.addPetShop(this.clientePetForm.value);

  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
