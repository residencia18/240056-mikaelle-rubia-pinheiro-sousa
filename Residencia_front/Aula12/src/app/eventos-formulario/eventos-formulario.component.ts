import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eventos-formulario',
  templateUrl: './eventos-formulario.component.html',
  styleUrl: './eventos-formulario.component.css'
})
export class EventosFormularioComponent {
  ordemDeNomeCliente!: FormGroup

  inscricao1!: Subscription;
  inscricao2!: Subscription;

  constructor(private formBuilder: FormBuilder){
    
  }

  ngOnInit(){
    this.ordemDeNomeCliente = this.formBuilder.group({
    nomeCliente: ['', [Validators.required, Validators.minLength(5)]],
    sobreNome: ['',Validators.required, Validators.minLength(5)]
  });

  }

  onSubmit(){
    console.log(this.ordemDeNomeCliente?.value);
  }	
  inscricaoStatusChanges(){
    // console.log('Inscrição statusChanges');
    let inscricao1 = this.ordemDeNomeCliente.get('nomeCliente')?.statusChanges.subscribe(
      status => console.log('Status do nome do cliente: ' + status)
    );
    let inscricao2 = this.ordemDeNomeCliente.get('sobreNome')?.statusChanges.subscribe(
      status => console.log('Status do sobreNome do cliente: ' + status)
    );

    
  }

}
