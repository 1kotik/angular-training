import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'filter-badge',
  templateUrl: './filter-badge.component.html',
  styleUrl: './filter-badge.component.scss'
})
export class FilterBadgeComponent {
  @Input() id: string = ''
  @Input() value: string = '';

  @Output() deleted = new EventEmitter();

  protected readonly faTimes = faTimes;

  public deleteBadge() {
    this.deleted.emit(this.id);
  }
}
