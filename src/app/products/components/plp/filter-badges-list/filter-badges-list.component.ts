import {Component, inject} from '@angular/core';
import {FilterInfoService} from "../../../services/filter-info.service";
import {Observable} from "rxjs";

@Component({
  selector: 'filter-badges-list',
  templateUrl: './filter-badges-list.component.html',
  styleUrl: './filter-badges-list.component.scss'
})
export class FilterBadgesListComponent {
  private filterInfoService: FilterInfoService = inject(FilterInfoService);

  public get filterInfos$(): Observable<Map<string, any>> {
    return this.filterInfoService.filterInfos$;
  }

  public deleteBadge(id: string): void {
    this.filterInfoService.deleteFilter(id);
  }

  public trackById(index: number, entry: [string, any]): string {
    return entry[0];
  }
}
