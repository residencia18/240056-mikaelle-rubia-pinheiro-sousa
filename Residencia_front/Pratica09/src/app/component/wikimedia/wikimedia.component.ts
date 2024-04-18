import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { WikipediaService } from '../../wikipedia.service';

@Component({
  selector: 'app-wikimedia',
  templateUrl: './wikimedia.component.html',
  styleUrls: ['./wikimedia.component.css'],
})
export class WikimediaComponent {
  @Input() title_project: string = "";
  title: string = '';
  extract: string = '';
  valueSearch: string = '';
  listSearch: string[] = [];
  listabuscas: { titulo: string, result: string }[] = [];
  today = new Date();

  @ViewChild('informacaos', { static: true })
  informacaos!: ElementRef;

  constructor(private wikipediaService: WikipediaService) {}

  onsendPages(valor: any) {
    this.valueSearch = valor;
    this.listSearch = [];

    this.extract = '';
    this.title = '';
    this.listabuscas = [];

    this.wikipediaService.searchPages(valor).subscribe(
      (dados: any) => {
        const pages = dados[3][0];

        if (pages.length > 0) {
          for (let i = 0; i < dados[3].length; i++) {
            // this.listSearch.push(dados[1][i]);

            this.wikipediaService.searchPage(dados[1][i]).subscribe(
              (dado: any) => {
                const pages  = (dado as any)['query']['pages']
                  
                  Object.keys(pages).forEach((pageId) => {
                    const page = pages[pageId];
                    const texto = page.extract;
                    this.extract = texto;
                    if(this.extract !== ''){
                      this.listabuscas.push({ titulo: dados[1][i], result: this.extract });
                    }
                      
                  });
                },
                (error) => {
                  console.error('Erro ao carregar dados:', error);
                  throw new Error('Resposta de rede não foi bem-sucedida');
                }
                );
              
          }
        } else {
          this.listSearch = []
        }
        this.title = " Resultado para busca: "+ valor;       
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        throw new Error('Resposta de rede não foi bem-sucedida');
      }
    );
  }
}