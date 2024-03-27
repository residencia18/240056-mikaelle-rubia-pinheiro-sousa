import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css'
})
export class FirstComponentComponent {
  dadosCarregados: any = "";
  erroAoCarregarDados: string = "";
  categoriaEscolhida: string = "";
  dadosAdicionados: string[] = [];

  
  @ViewChild('content', { static: true })
  content!: ElementRef;


  @ViewChild('informacaos', { static: true })
  informacaos!: ElementRef;
  

  @ViewChild('Blocoinformacaos', { static: true })
  Blocoinformacaos!: ElementRef;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  newElementP = document.createElement('p');


  selecionarCategoria(categoria: string) {

    this.categoriaEscolhida = categoria;
    if (!this.content.nativeElement.firstChild) {
      this.criarElementos(this.dadosCarregados);
    }if(this.dadosCarregados[this.categoriaEscolhida].length >=3){
      this.content.nativeElement.innerHTML = '';
      this.criarElementos(this.dadosCarregados);

    }
  }

  salvarDadosEmJSONLocal(): void {
    const dadosJson = JSON.stringify(this.dadosAdicionados, null, 2);
  
    const blob = new Blob([dadosJson], { type: 'application/json' });
    const nomeArquivo = 'dados_adicionados.json';
    const arquivo = new File([blob], nomeArquivo, { type: 'application/json' });
    saveAs(arquivo);
  }


  Addinformacoes(result: any): void {
    if (this.Blocoinformacaos && this.Blocoinformacaos.nativeElement) {
      this.newElementP = document.createElement('p');
      this.newElementP.innerHTML = `${result}<br>`;
      this.dadosAdicionados.push(result);
  
      const newElementSpan = this.Blocoinformacaos.nativeElement.querySelector('span');
      if (newElementSpan) {
        if (!newElementSpan.innerHTML.includes(result)) {
          newElementSpan.appendChild(this.newElementP);
          this.styleNewInformacoes(newElementSpan);
        }
      } else {
        const newSpan = document.createElement('span');
        newSpan.appendChild(this.newElementP);
        this.Blocoinformacaos.nativeElement.appendChild(newSpan);
      }
    }
  }
  botaoTopo(titulo: any, idButton: any): void{
    const newElementTop = document.createElement('button');
    newElementTop.innerHTML = `${titulo} `;
    this.styleBotaoTopo(newElementTop)
    idButton.nativeElement.appendChild(newElementTop);

  }
  
  criarElementos(result: any): void {
    if (this.content && this.content.nativeElement) {
      const tamanhoLista = result[this.categoriaEscolhida].length;
      let clicado = 0;

      this.botaoTopo(this.categoriaEscolhida, this.content)
      

      for (let i = 0; i < tamanhoLista; i++) {
        const newElement = document.createElement('button');
        this.renderer.setAttribute(newElement, 'id', `meuBotao`);

        newElement.innerHTML = `${result[this.categoriaEscolhida][i].Name} `;
        this.styleNewBotoes(newElement);
      
        this.content.nativeElement.appendChild(newElement);

        newElement.addEventListener('click', () => {

          clicado ++;
          if (clicado > 1) {
            const elementosP = this.Blocoinformacaos.nativeElement.querySelectorAll('span p') as NodeListOf<HTMLElement>;
            elementosP.forEach((elementoP: HTMLElement) => {
              elementoP.remove();
            });
          }
          this.criarElementosBotao(result[this.categoriaEscolhida][i], clicado);      
        });
      }
    } else {
      console.error('this.content.nativeElement é nulo ou indefinido.');
    }
  }

  criarElementosBotao(result: any, clicado: number): void {
    if (this.informacaos && this.informacaos.nativeElement) {
      if (clicado > 1) {
        this.informacaos.nativeElement.innerHTML= ""
        const elementosAntigos = this.informacaos.nativeElement.querySelectorAll('.meuBotaoFilho') as NodeListOf<HTMLElement>;
        elementosAntigos.forEach((elementoAntigo: HTMLElement) => {
          this.informacaos.nativeElement.removeChild(elementoAntigo);
        });
        
      }
      this.botaoTopo(result.Name, this.informacaos);
      
      for (const propriedade in result) {
        if (result.hasOwnProperty(propriedade)) {
          const newElementBotao = document.createElement('button');
          this.renderer.setAttribute(newElementBotao, 'id', `meuBotaoFilho_${propriedade}`);
          this.renderer.addClass(newElementBotao, 'meuBotaoFilho');
          newElementBotao.innerHTML = `${propriedade}`;
          this.styleNewBotoesFilhos(newElementBotao);
          this.informacaos.nativeElement.appendChild(newElementBotao);
          newElementBotao.addEventListener('click', () => {

            this.Addinformacoes(result[propriedade]);
          });
        }
      }
    } else {
      console.error('this.informacaos.nativeElement é nulo ou indefinido.');
    }
  }
  

  exibirMensagem(): Promise<any> {
    return this.http.get('assets/veiculos.json').toPromise()
      .then((veiculos) => {
        return veiculos;
      })
      .catch((error) => {
        console.error('Erro ao carregar dados:', error);
        throw new Error('Resposta de rede não foi bem-sucedida');
      });
  }

  ngOnInit() {

    this.exibirMensagem()
      .then((dados) => { 
        this.dadosCarregados = dados;
      })
      .catch((error) => {
        this.erroAoCarregarDados = error.message;
      }); 
  }

  styleNewInformacoes(newElement: any): void {
    newElement.style.backgroundColor = 'rgb(216, 100, 106)';
    newElement.style.padding = '100px';
    newElement.style.color = '#ffffff';
    newElement.style.marginTop = '10px';
    newElement.style.border = '2px solid #60335d';
    newElement.style.borderRadius = '5px';
    newElement.style.display = 'block'; 

}

  styleNewBotoes(newElement : any): void{
    newElement.style.backgroundColor = '#007bff';
    newElement.style.padding = '10px';
    newElement.style.color = '#ffffff';
    newElement.style.marginTop = '10px';
    newElement.style.border = '2px solid #60335d';
    newElement.style.borderRadius = '5px';
    newElement.style.display = 'block'; 
  }

  styleNewBotoesFilhos(newElement : any): void{
    newElement.style.backgroundColor = '#3CFAD8';
    newElement.style.padding = '10px';
    newElement.style.color = '#000000';
    newElement.style.marginTop = '10px';
    newElement.style.border = '2px solid #60335d';
    newElement.style.borderRadius = '5px';
    newElement.style.display = 'block'; 
  }

  styleBotaoTopo(newElement: any): void {
    newElement.style.backgroundColor = 'rgb(237, 134, 96)';
    newElement.style.fontFamily= 'NomeDaFonte', 'sans-serif';
    newElement.style.padding = '10px 15px';
    newElement.style.color = '#ffffff';
    newElement.style.marginTop = '10px';
    newElement.style.border = '2px solid #60335d';
    newElement.style.borderRadius = '5px';
    newElement.style.display = 'block'; 

}


}
