import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthPageComponent} from './components/auth-page/auth-page.component';
import {AuthFormComponent} from "./components/auth-form/auth-form.component";


@NgModule({
  declarations: [
    AuthFormComponent,
    AuthPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent,
    AuthPageComponent,
  ]
})
export class AuthModule { }
