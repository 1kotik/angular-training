import {inject, Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {User} from "../../shared/models/user.model";
import {map, Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private apiService: ApiService = inject(ApiService);
  private ENTITY_NAME = 'users';

  public getUserByEmail(email: string): Observable<User | null> {
    const httpParams = new HttpParams().set('email', email);
    return this.apiService.get<User[]>(this.ENTITY_NAME, httpParams).pipe(map(users => {
      if (users && users.length > 0) {
        return users[0];
      } else {
        return null;
      }
    }));
  }

  public createUser(email: string, password: string): Observable<User> {
    const newUser = {
      email: email,
      password: password
    };
    return this.apiService.post<User>(this.ENTITY_NAME, newUser);
  }
}
