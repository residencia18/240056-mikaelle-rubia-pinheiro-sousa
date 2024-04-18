import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent  implements OnInit{

  ordemDeForm!: FormGroup;
  nome: string = '';
  senha: string = '';
  email: string = '';
  nome_completo: string = '';
  telefone: string = '';
  endereco: string = '';
  data_nascimento: string = '';
  genero: string = '';
  profissao: string = '';

  constructor(private formBuilder: FormBuilder){
    
  }

  ngOnInit(){
    this.ordemDeForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12) ]],
      senha : ['', [Validators.required,Validators.minLength(3),] ],
      email: ['', [Validators.required] ],
      nome_completo: ['', [Validators.required, Validators.minLength(3),]],
      telefone: ['', [Validators.required, Validators.pattern("^\d{2}-\d{5}-\d{4}$")]],
      endereco: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\s,.'-]+$")] ],
      data_nascimento: ['', [Validators.required ]],
      genero: ['', [Validators.required]],
      profissao : ['', [Validators.required]],
    })
  }

  onSubmit(){
    console.log(this.ordemDeForm?.value);
  }	

  onInput(event: any, fieldName: string) {
    switch (fieldName) {
        case 'nome':
            this.nome = event.target.value;
            break;
        case 'email':
            this.email = event.target.value;
            break;
        case 'nome_completo':
            this.nome_completo = event.target.value;
            break;
        case 'telefone':
            this.telefone = event.target.value;
            break;
        case 'endereco':
            this.endereco = event.target.value;
            break;
        case 'data_nascimento':
            this.data_nascimento = event.target.value;
            break;
        case 'genero':
            this.genero = event.target.value;
            break;
        case 'profissao':
            this.profissao = event.target.value;
            break;
        default:
            break;
    }
}

inscricaoValueChanges(){
  console.log('Inscrição valueChanges');
  let inscricao1 = this.ordemDeForm.get('nome')?.valueChanges.subscribe(
    valor => console.log('Nome do cliente: ' + valor)
  );
  let inscricao2 = this.ordemDeForm.get('senha')?.valueChanges.subscribe(
    valor => console.log('senha: ' + valor)
  );
  let inscricao3 = this.ordemDeForm.get('email')?.valueChanges.subscribe(
    valor => console.log('Email: ' + valor)
  );
  let inscricao4 = this.ordemDeForm.get('nome_completo')?.valueChanges.subscribe(
    valor => console.log('Nome completo: ' + valor)
  );
  let inscricao5 = this.ordemDeForm.get('telefone')?.valueChanges.subscribe(
    valor => console.log('Telefone: ' + valor)
  );
  let inscricao6 = this.ordemDeForm.get('endereco')?.valueChanges.subscribe(
    valor => console.log('Endereço: ' + valor)
  );
  let inscricao7 = this.ordemDeForm.get('data_nascimento')?.valueChanges.subscribe(
    valor => console.log('Data de nascimento: ' + valor)
  );
  let inscricao8 = this.ordemDeForm.get('genero')?.valueChanges.subscribe(
    valor => console.log('Genero: ' + valor)
  );
  let inscricao9 = this.ordemDeForm.get('profissao')?.valueChanges.subscribe(
    valor => console.log('Profissao: ' + valor)
  );

}

inscricaoStatusChanges(){
  console.log('Inscrição statusChanges');
  let inscricao1 = this.ordemDeForm.get('nome')?.statusChanges.subscribe(
    status => console.log('Nome do cliente: ' + status)
  );
  let inscricao2 = this.ordemDeForm.get('senha')?.statusChanges.subscribe(
    status => console.log('senha: ' + status)
  );
  let inscricao3 = this.ordemDeForm.get('email')?.statusChanges.subscribe(
    status => console.log('Email: ' + status)
  );
  let inscricao4 = this.ordemDeForm.get('nome_completo')?.statusChanges.subscribe(
    status => console.log('Nome completo: ' + status)
  );
  let inscricao5 = this.ordemDeForm.get('telefone')?.statusChanges.subscribe(
    status => console.log('Telefone: ' + status)
  );
  let inscricao6 = this.ordemDeForm.get('endereco')?.statusChanges.subscribe(
    status => console.log('Endereço: ' + status)
  );
  let inscricao7 = this.ordemDeForm.get('data_nascimento')?.statusChanges.subscribe(
    status => console.log('Data de nascimento: ' + status)
  );
  let inscricao8 = this.ordemDeForm.get('genero')?.statusChanges.subscribe(
    status => console.log('Genero: ' + status)
  );
  let inscricao9 = this.ordemDeForm.get('profissao')?.statusChanges.subscribe(
    status => console.log('Profissao: ' + status)
  );
}


}
