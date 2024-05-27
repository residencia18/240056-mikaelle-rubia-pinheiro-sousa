import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Location, Schedule } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateUnitsService {
  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];
  filteredResults: Location[] = [];

  readonly apiUrl = environment.fireDatabase;
  constructor(private http: HttpClient) {}

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnitById(id: string): Observable<Location | undefined> {
    return this.getAllUnits().pipe(
      map(units => units.find(unit => unit.id === id))
    );
  }

  getFilteredUnits() {
    return this.filteredUnits;
  }

  setFilterUnits(value: Location[]){
    return this.filteredUnits = value;
  }

  fetchAllUnits(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + 'unitGym.json').pipe(
      map((responseData) => {
        const postArray: Location[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...(responseData as any)[key], id: key });
          }
        }
        this.allUnitsSubject.next(postArray);
        this.filteredUnits = postArray;
        return postArray;
      })
    );
  }

  addUnit(LocationData: {
              title: string,
              content: string,
              opened: boolean,
              mask: string,
              towel: string,
              fountain: string,
              locker_room: string,
              schedules: Schedule []}): Observable<any> {
    return this.http.post(this.apiUrl+ 'unitGym.json', LocationData);
  }

  UpdateUnit(LocationData: {
                  title: string,
                  content: string,
                  opened: boolean,
                  mask: string,
                  towel: string,
                  fountain: string,
                  locker_room: string,
                  schedules: Schedule []}, idUnit: string): Observable<any> {
          return this.http.put(this.apiUrl+ `unitGym/${idUnit}.json`, LocationData);
  }


  deleteUnit(idUnit: string):Observable<any>{
    return this.http.delete(this.apiUrl+ `unitGym/${idUnit}.json`,);
  }
}
