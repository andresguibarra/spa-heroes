import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Hero } from './models';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(environment.baseUrl);
  }

  getById(id: number): Observable<Hero> {
    return this.httpClient.get<Hero>(`${environment.baseUrl}/${id}`);
  }

  getByParameter(value: string): Observable<Hero[]> {
    return this.getAll().pipe(
      map((heroes) => {
        if (value === '') {
          return heroes;
        }
        return heroes.filter(
          (h) => h.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
      })
    );
  }

  update(id: number, newName: string): Observable<Hero> {
    return this.httpClient.put<Hero>(`${environment.baseUrl}/${id}`, {
      name: newName,
    });
  }

  delete(id: number): Observable<Hero> {
    return this.httpClient.delete<Hero>(`${environment.baseUrl}/${id}`);
  }

  add(name: string): Observable<Hero> {
    return this.httpClient.post<Hero>(`${environment.baseUrl}`, { name: name });
  }
}
