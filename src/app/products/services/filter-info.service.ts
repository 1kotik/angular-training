import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FILTER_CONFIGS_MAP} from "../../shared/constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class FilterInfoService {
  private filterInfosSubject: BehaviorSubject<Map<string, any>> = new BehaviorSubject<Map<string, any>>(new Map([]));
  private _filterInfos$: Observable<Map<string, any>> = this.filterInfosSubject.asObservable();
  private filterDeletedSubject: Subject<string> = new Subject<string>();
  public filterDeleted$: Observable<string> = this.filterDeletedSubject.asObservable();

  public get filterInfos$(): Observable<Map<string, any>> {
    return this._filterInfos$;
  }

  public updateFilterInfos(value: any) {
    let filterInfos = this.filterInfosSubject.value;
    let isChanged = false;

    for (let [filterId] of FILTER_CONFIGS_MAP) {
      isChanged = this.saveFilterValueIfChanged(filterInfos, filterId, value[filterId]) || isChanged;
    }

    if (isChanged) {
      this.filterInfosSubject.next(new Map(filterInfos));
    }
  }

  public deleteFilter(id: string): void {
    let filterInfos = this.filterInfosSubject.value;
    filterInfos.delete(id);
    this.filterInfosSubject.next(new Map(filterInfos));
    this.filterDeletedSubject.next(id);
  }

  private saveFilterValueIfChanged(filterInfos: Map<string, any>, filterId: string, newValue: any): boolean {
    let oldValue = filterInfos.get(filterId);
    let newValueIsEmpty = !newValue
      || (typeof newValue === 'object' &&
        Object.values(newValue).every(val => val === undefined || val === null || val === 0 || val === false));
    let valuesNotEqual = oldValue !== newValue;
    if (valuesNotEqual) {
      if (!newValueIsEmpty) {
        filterInfos.set(filterId, newValue);
      } else {
        filterInfos.delete(filterId);
      }
      return true;
    }
    return false;
  }
}
