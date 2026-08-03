import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PLPSearchService {

  private _searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public saveQuery(searchInput: string): void {
    this._searchQuery$.next(searchInput);
  }

  public get searchQuery(): BehaviorSubject<string> {
    return this._searchQuery$;
  }
}
