import {inject, Injectable} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {APP_CONSTANTS} from "../../shared/constants/app.constants";
import {BehaviorSubject, fromEvent, map, Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {AuthDataService} from "./auth-data.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authDataService: AuthDataService = inject(AuthDataService);
  private router: Router = inject(Router);
  private loggedUserSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  public loggedUser$: Observable<User | undefined> = this.loggedUserSubject.asObservable();
  public isLoggedIn = false;


  constructor() {
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(takeUntilDestroyed())
      .subscribe(event => {
        if (event.key === APP_CONSTANTS.USER_KEY) {
          this.loadUserFromStorage();
        }
      });
  }

  public getCurrentUser(): User | undefined {
    return this.loggedUserSubject.value;
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.authDataService.getUserByEmail(email).pipe(map(user => {
      if (user && user.password === password) {
        this.loggedUserSubject.next(user);
        localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(this.loggedUserSubject.value));
        localStorage.removeItem(APP_CONSTANTS.GUEST_CART_ID_KEY);
        this.isLoggedIn = true;
      }
      return this.isLoggedIn;
    }));
  }

  public register(email: string, password: string): Observable<boolean> {
    return this.authDataService.getUserByEmail(email).pipe(switchMap(user => {
      if (!user) {
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

  public loadUserFromStorage() {
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
    return this.authDataService.createUser(email, password).pipe(map(user => {
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
