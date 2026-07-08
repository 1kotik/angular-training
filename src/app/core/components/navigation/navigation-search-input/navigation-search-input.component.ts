import {Component, inject} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {PLPSearchService} from "../../../../products/services/plp-search.service";

@Component({
  selector: 'app-navigation-search-input',
  templateUrl: './navigation-search-input.component.html',
  styleUrl: './navigation-search-input.component.scss'
})
export class NavigationSearchInputComponent {
  private plpSearchService: PLPSearchService = inject(PLPSearchService);

  protected readonly faSearch = faSearch;


  public saveQuery(event: Event): void {
    let inputElement = event.target as HTMLInputElement;
    this.plpSearchService.saveQuery(inputElement.value);
  }
}
