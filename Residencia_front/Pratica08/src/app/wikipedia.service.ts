import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://pt.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  searchPages(value: string): Observable<any> {
    const params = {
      action: 'opensearch',
      search: value,
      limit: '10',
      namespace: '0',
      format: 'json',
      utf8: '1',
      origin: '*',
    };

    return this.http.get(this.apiUrl, { params });
  }

  searchPage(value: string): Observable<any> {
    const params = {
      action: 'query',
      format: 'json',
      prop: 'extracts',
      exintro: true,
      explaintext: true,
      titles: value,
      utf8: 1,
      origin: '*',
    };
    
    return this.http.get(this.apiUrl, { params });
  }
}
