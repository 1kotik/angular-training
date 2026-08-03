import {inject, Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {HttpParams} from "@angular/common/http";
import {User} from "../../shared/models/user.model";
import {APP_CONSTANTS} from "../../shared/constants/app.constants";
import {BehaviorSubject, fromEvent, map, Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiService: ApiService = inject(ApiService);
  private router: Router = inject(Router);
  private ENTITY_NAME = 'users';
  private loggedUserSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  public loggedUser$: Observable<User | undefined> = this.loggedUserSubject.asObservable();
  public isLoggedIn = false;


  constructor() {
    this.loadUserFromStorage();

    fromEvent<StorageEvent>(window, 'storage').subscribe(event => {
      if (event.key === APP_CONSTANTS.USER_KEY) {
        this.loadUserFromStorage();
      }
    });
  }

  public getCurrentUser(): User | undefined {
    return this.loggedUserSubject.value;
  }

  public login(email: string, password: string): Observable<boolean> {
    const httpParams = new HttpParams().set('email', email);
    return this.apiService.get<User[]>(this.ENTITY_NAME, httpParams).pipe(map(users => {
      if (users && users.length > 0 && users[0].password === password) {
        this.loggedUserSubject.next(users[0]);
        localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(this.loggedUserSubject.value));
        localStorage.removeItem(APP_CONSTANTS.GUEST_CART_ID_KEY);
        this.isLoggedIn = true;
      }
      return this.isLoggedIn;
    }));
  }

  public register(email: string, password: string): Observable<boolean> {
    const httpParams = new HttpParams().set('email', email);
    return this.apiService.get<User[]>(this.ENTITY_NAME, httpParams).pipe(switchMap(users => {
      if (!users || users.length === 0) {
        return this.createNewUser(email, password);
      }
      return of(false);
    }));
  }

  public logout() {
    localStorage.removeItem(APP_CONSTANTS.USER_KEY);
    localStorage.removeItem(APP_CONSTANTS.GUEST_CART_ID_KEY);
    this.loggedUserSubject.next(undefined);
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }

  private loadUserFromStorage() {
    const stringUser = localStorage.getItem(APP_CONSTANTS.USER_KEY);
    const currentUser = this.loggedUserSubject.value;
    if (stringUser) {
      const user = JSON.parse(stringUser);
      if (!currentUser || currentUser.id !== user.id) {
        this.loggedUserSubject.next(user);
        this.isLoggedIn = true;
      }
    } else {
      if (currentUser !== undefined) {
        this.loggedUserSubject.next(undefined);
        this.isLoggedIn = false;
      }
    }
  }

  private createNewUser(email: string, password: string): Observable<boolean> {
    const newUser = {
      email: email,
      password: password
    };
    return this.apiService.post<User>(this.ENTITY_NAME, newUser).pipe(map(user => {
      if (user) {
        this.loggedUserSubject.next(user);
        localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(this.loggedUserSubject.value));
        localStorage.removeItem(APP_CONSTANTS.GUEST_CART_ID_KEY);
        this.isLoggedIn = true;
      }
      return this.isLoggedIn;
    }));
  }
}
