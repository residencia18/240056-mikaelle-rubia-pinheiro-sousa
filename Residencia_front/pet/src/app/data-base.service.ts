import { Injectable } from '@angular/core';
import {Petshop} from './petshop.model';
import { HttpClient,  HttpParams} from '@angular/common/http';
import { Observable, map} from 'rxjs';
import { Firestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  loadedPetshop: Petshop[]=[]
  constructor(private http: HttpClient, private firestore: Firestore) { }

  ngOnInit(): void {

  }
  getPetshot(): Observable<any>{
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://residenciaaula13-default-rtdb.firebaseio.com/posts.json';
    const fullUrl = corsAnywhereUrl + apiUrl;

    return this.http.get(fullUrl,
      {}
    )
    .pipe(
      map( (responseData) => {
        const postArray: Petshop[] = [];
        for (const key in responseData) {
            if ((responseData).hasOwnProperty(key)){
              postArray.push({...(responseData as any)[key], id: key});
            }
        }
        return postArray;
      }
      )
    );
  }


  // getPetshot(): Observable<any>{
  //   const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  //   const apiUrl = 'https://residenciaaula13-default-rtdb.firebaseio.com/posts.json';
  //   const fullUrl = corsAnywhereUrl + apiUrl;

  //   return this.http.get(fullUrl,
  //     {}
  //   )
  //   .pipe(
  //     map( (responseData) => {
  //       const postArray: Petshop[] = [];
  //       for (const key in responseData) {
  //           if ((responseData).hasOwnProperty(key)){
  //             postArray.push({...(responseData as any)[key], id: key});
  //           }
  //       }
  //       return postArray;
  //     }
  //     )
  //   );
  // }


  addPetShop(petshopData:{ nomeTutor: string,
                            nomeAnimal:string,
                            idade: number,
                            raca: string,
                            historico: string,
                            peso: number}){

  this.http.post(
    'https://residenciaaula13-default-rtdb.firebaseio.com/posts.json',
    petshopData)
    .subscribe(responseData => {
      console.log("Post:",responseData);
    });
  }

}
