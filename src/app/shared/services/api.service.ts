import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = "http://localhost:3000";
  private httpClient: HttpClient = inject(HttpClient);

  public get<T>(entity: string): Observable<T> {
    return this.httpClient.get<T>(`${this.API_URL}/${entity}`);
  }

  public deleteById<T>(entity: string, id: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.API_URL}/${entity}/${id}`);
  }
}
