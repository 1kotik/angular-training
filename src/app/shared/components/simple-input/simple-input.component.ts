import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'simple-input',
  templateUrl: './simple-input.component.html',
  styleUrl: './simple-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleInputComponent),
      multi: true
    }
  ]
})
export class SimpleInputComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() pattern: string = '';
  @Input() inputType: string = 'input';

  public value: string | number | boolean = '';

  onChange: (value: string | number | boolean) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: string | number | boolean): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
