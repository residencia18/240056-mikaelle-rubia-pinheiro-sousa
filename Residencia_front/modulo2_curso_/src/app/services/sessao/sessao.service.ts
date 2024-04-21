import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sessao } from '../../models/interfaces/Sessao/sessao';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  private API_URL = environment.fireDatabase;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllSessao(): Observable<Sessao[]>{
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return this.http.get<Sessao[]>(this.API_URL+ 'sessao.json', {
      headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
    }).pipe(
        map((responseData) => {
            const postArray: Sessao[] = [];
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)){
                    postArray.push({ ...(responseData as any)[key], id: key });
                }
            }
            return postArray;
        })
    );
  }


  deleteSessao(idSessao: string):Observable<any>{
    return this.http.delete(this.API_URL+`sessao/${idSessao}.json`);
  }

  addSessao(SessaoData:{
            data_atividade: string
            atividade: string
            animais: string []
            descricao: string}):Observable<any> {
      return this.http.post(this.API_URL+ 'sessao.json', SessaoData);
  }

  editSessao(SessaoData:{
            data_atividade: string
            atividade: string
            animais: string []
            descricao: string}, idSessao: string):Observable<any> {
  return this.http.put(this.API_URL+`sessao/${idSessao}.json`, SessaoData);
  }


}
