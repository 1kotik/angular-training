import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import {NavigationButtonComponent} from "./components/navigation/navigation-button/navigation-button.component";
import {RouterLink} from "@angular/router";
import { NavigationSearchInputComponent } from './components/navigation/navigation-search-input/navigation-search-input.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    NavigationButtonComponent,
    NavigationSearchInputComponent
  ],
  exports: [
    NavigationBarComponent,
    NavigationButtonComponent
  ],
  imports: [
    CommonModule,
    FaIconComponent,
    SharedModule,
    RouterLink
  ]
})
export class CoreModule { }
