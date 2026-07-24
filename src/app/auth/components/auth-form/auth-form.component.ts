import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  public form: FormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });

  public isSignInMode: boolean = true;
  public isAuthSuccess: boolean = true;

  public changeAuthMode(): void {
    this.isAuthSuccess = true;
    this.isSignInMode = !this.isSignInMode;
    if (this.isSignInMode) {
      this.form.removeControl('confirmPassword');
      this.form.clearValidators();
    } else {
      this.form.addControl('confirmPassword', this.formBuilder.control(null));
      this.form.setValidators(passwordsMatchValidator());
    }
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  public performAuth(): void {
    let formValues = this.form.value;
    let authResult$ = this.isSignInMode ? this.userService.login(formValues.email, formValues.password)
      : this.userService.register(formValues.email, formValues.password);
    authResult$.subscribe(isSuccess => {
      this.isAuthSuccess = isSuccess;
      if (this.isAuthSuccess) {
        this.router.navigate(['/products']);
      } else {
        this.form.controls['password'].reset();
      }
    })
  }

  public isInputInvalid(name: string): boolean {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }
}

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {PasswordsDoNotMatch: true};
  }
}
