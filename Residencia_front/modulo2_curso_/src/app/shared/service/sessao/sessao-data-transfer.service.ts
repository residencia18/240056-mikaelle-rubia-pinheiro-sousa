import { Injectable } from '@angular/core';
import { Sessao } from '../../../models/interfaces/Sessao/sessao';
import { BehaviorSubject, map, take } from 'rxjs';
import { SuinosService } from '../../../services/suino/suinos.service';

@Injectable({
  providedIn: 'root'
})
export class SessaoDataTransferService {
  public sessaoDataEmitter$ = new BehaviorSubject<Sessao[] | null>(null);
  public sessaoDatas: Sessao [] =[];
  public sessaoHistorico: Sessao [] =[];
  public listBrinco: Number[] =[]
  public id_sessao: string= ""
  constructor(private suinosService: SuinosService) { }

  setSessaoData(sessao: Sessao []): void{
    if(sessao){
      this.sessaoDataEmitter$.next(sessao);
      this.getSessaoDatas();
    }
  }
  getSessaoDatas() {
    this.sessaoDataEmitter$
    .pipe(
      take(1),
      map((responseData) => responseData?.filter((sessao) => sessao.animais.length > 0))
    )
    .subscribe({
      next: (response) => {
        if (response) {
          this.sessaoDatas = response;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    return this.sessaoDatas
  }

  getSessaoDatasId(id: string) {
    this.sessaoDataEmitter$
    .pipe(
      take(1),
      map((responseData) => responseData?.filter((sessao) => sessao))
    )
    .subscribe({
      next: (response) => {

        if (response) {
          this.sessaoDatas = response;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    return this.sessaoDatas
  }

  setIdSessao(id: string): void{
    this.id_sessao = id;
  }

  setListabrinco(){
    this.listBrinco = []
      this.suinosService.getAllSuinos()
      .pipe()
      .subscribe({
        next:(response)=>{
            for(let suino of response) {
              this.listBrinco.push(suino.brinco);
            }
        },
      })
    }


}
