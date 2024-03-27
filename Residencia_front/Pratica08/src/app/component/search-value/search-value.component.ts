import { Component , ElementRef, ViewChild, Input} from '@angular/core';
import { WikipediaService } from '../../wikipedia.service';

@Component({
  selector: 'app-search-value',
  templateUrl: './search-value.component.html',
  styleUrls: ['./search-value.component.css']
})
export class SearchValueComponent {
  @Input() title_project: string = "";
  title: string = '';
  extract: string = '';
  valueSearch: string = '';
  listabuscas: { titulo: string, result: string }[] = [];
  today = new Date();

  @ViewChild('informacaos', { static: true })
  informacaos!: ElementRef;

  constructor(private wikipediaService: WikipediaService) {}

  onsendPages(valor: any) {
    this.valueSearch = valor;
    this.extract = '';
    this.title = '';
    this.listabuscas = [];

    this.wikipediaService.searchPages(valor).subscribe(
      (dados: any) => {
        const pages = dados[3][0];

        try{   
  
          if (pages.length > 0) {
            for (let i = 0; i < dados[3].length; i++) {
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
                  });
            }
            this.title = " Resultado para busca: "+ valor;       
  
          } else {
            this.title = "Não encontrei resposta para sua busca"
          }
        }catch (error) {
          console.error('Erro ao processar dados:', error);
          this.title = "Não encontrei resposta para sua busca"

        }
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        throw new Error('Resposta de rede não foi bem-sucedida');
      });

  }
}
