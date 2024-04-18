import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Sessao } from '../../models/interfaces/Sessao/sessao';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalhesService {
  private API_URL = environment.fireDatabase;
  constructor(private http: HttpClient, private cookieService: CookieService) { }


  getAllDetalhes(id_sessao: string): Observable<Sessao[]> {
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return this.http.get<Sessao[]>(this.API_URL + 'sessao.json', {
      headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
    }).pipe(
      map((responseData) => {
        const filteredArray: Sessao[] = responseData.filter(sessao => sessao.id === id_sessao);
        return filteredArray;
      })
    );
  }


}
