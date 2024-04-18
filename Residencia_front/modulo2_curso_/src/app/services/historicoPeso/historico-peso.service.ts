import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PesoSuino } from '../../models/interfaces/Peso/PesoSuino';
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricoPesoService {
  private API_URL = environment.fireDatabase;
  private JWT_TOKEN = this.cookieService.get('USER_INFO')

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  getAllPeso(id_suino: string): Observable<PesoSuino[]> {
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return this.http.get<PesoSuino[]>(this.API_URL+ 'pesos.json', {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
    }).pipe(
        map((responseData) => {
            const postArray: PesoSuino[] = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)){
                    if ((responseData as any)[key].id_suino === id_suino) {
                        postArray.push({ ...(responseData as any)[key], id: key });
                    }
                }
            }
            return postArray;
        })
    );
}


  deletePeso(PesoId: string):Observable<any>{
    return this.http.delete(this.API_URL+`pesos/${PesoId}.json`);
  }

  addPeso(pesoData: {
        dataPesagem: string;
        pesoKg: number;
        id_suino: string}):Observable<any> {
    return this.http.post(this.API_URL+ 'pesos.json', pesoData);
  }


  editPeso(pesoData: {
    dataPesagem: string;
    pesoKg: number;
    id_suino: string}, id_peso: string):Observable<any> {
  return this.http.put(this.API_URL+ `pesos/${id_peso}.json`, pesoData);
  }



}
