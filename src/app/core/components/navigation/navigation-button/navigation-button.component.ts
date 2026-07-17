import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.scss'
})
export class NavigationButtonComponent {
  @Input() public text?: string;
  @Input() public icon?: IconDefinition;
  @Input() public link?: string;
}
