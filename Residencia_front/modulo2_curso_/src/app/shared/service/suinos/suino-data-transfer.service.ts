import { PesoSuino } from './../../../models/interfaces/Peso/PesoSuino';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take,map } from 'rxjs';
import{ Suino} from '../../../models/interfaces/Suino/Suino';



@Injectable({
  providedIn: 'root'
})
export class SuinoDataTransferService {
  public suinoDataEmitter$ = new BehaviorSubject<Suino[] | null>(null);
  public suinoPesoDataEmitter$ = new BehaviorSubject<PesoSuino[] | null>(null);
  public suinosDatas: Suino[]=[]
  public pesoSuinoDatas: PesoSuino[] =[]
  public id_suino: string= ""
  public listBrinco: Number[] =[]

  constructor() { }

  setSuinosDatas(suinos: Suino[]): void{
    if(suinos){
      this.suinoDataEmitter$.next(suinos);
      this.getSuinosDatas()
      this.listBrinco = this.setListabrinco(suinos)
    }
  }
  getSuinosDatas() {
    this.suinoDataEmitter$
      .pipe(
        take(1),
        map((responseData) => responseData?.filter((suino) => suino.brinco > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.suinosDatas = response;
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
      return this.suinosDatas
  }

  getPesoDatas(id: string) {
    this.suinoPesoDataEmitter$
    .pipe(
      take(1),
      map((responseData) => responseData?.filter((peso) => peso.id_suino == id))
    )
    .subscribe({
      next: (response) => {
        if (response) {
          this.pesoSuinoDatas = response;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    return this.pesoSuinoDatas
  }

  setPesoDatas(pesoSuino: PesoSuino[]): void {
    if (pesoSuino) {

      this.suinoPesoDataEmitter$.next(pesoSuino);
      this.getPesoDatas(this.id_suino);
    }
  }
  setIdSuino(id: string): void{
    this.id_suino = id;
  }

  setListabrinco(suinosDatas: any){
    const list: Number[]=[]
    for(let suino of  suinosDatas) {
      list.push(suino.brinco);

    }
    return list;
  }

}
