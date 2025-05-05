import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ricks } from '../interfaces/ricks';

@Injectable({
  providedIn: 'root'
})
export class RickService {
  public nextURL: string | null = null;
  public previousURL: string | null = null;

  constructor(private http: HttpClient) {}

  getRicks(url: string = 'https://rickandmortyapi.com/api/character'): Observable<Ricks> {
    return this.http.get<Ricks>(url); // corregido: this.http
  }

  getRick(name: string): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
  }
}
