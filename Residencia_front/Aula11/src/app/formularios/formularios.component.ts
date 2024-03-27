import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent {
  @ViewChild('formulario') aviaoForm: NgForm | undefined;
  menor_idade: boolean = false;
  dados_formulario: any = '';

  onSubmit(){
    if(this.aviaoForm){
      let { nome, senha, email, nome_completo, telefone, endereco, data_nascimento, genero, profissao } = this.aviaoForm.value;
      console.log(nome, senha, email, nome_completo, telefone, endereco, data_nascimento, genero, profissao);
      
      this.dados_formulario = JSON.stringify(this.aviaoForm.value, null, 2);
      
      const dataNascimento = new Date(data_nascimento);
      const hoje = new Date();
      const diferencaAnos = hoje.getFullYear() - dataNascimento.getFullYear();
      
      if (diferencaAnos < 18) {
        console.log('Usuário deve ter no mínimo 18 anos.');
        this.menor_idade = true;
      }
      
    }
    
    console.log(">>>"+this.dados_formulario);
    console.log(this.aviaoForm);
    //this.aviaoForm?.reset();
  }

  
}
