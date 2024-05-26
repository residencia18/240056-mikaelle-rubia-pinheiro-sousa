import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateUnitsService {
  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];
  results: Location[] = [];
  filteredResults: Location[] = [];

  readonly apiUrl = environment.fireDatabase;
  constructor(private http: HttpClient) {
    this.http.get<UnitsResponse>(this.apiUrl).subscribe(data =>{
    this.allUnitsSubject.next(data.locations);
    this.filteredUnits = data.locations;
  });}

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnits() {
    return this.filteredUnits;
  }

  setFilterUnits(value: Location[]){
    return this.filteredUnits = value;
  }

  addUnit(LocationData: {
    title: string,
    content: string,
    opened: boolean,
    mask: string,
    towel: string,
    fountain: string,
    locker_room: string,
  }): Observable<any> {
  return this.http.post(this.apiUrl+ 'unitGym.json', LocationData);
  }
}
