import {Component, DestroyRef, forwardRef, inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export interface RangeModel {
  from?: number;
  to?: number;
}

@Component({
  selector: 'range-filter',
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeFilterComponent),
    multi: true
  }]
})
export class RangeFilterComponent implements ControlValueAccessor, OnInit {
  @Input() name = '';
  @Input() min: number | null = null;
  @Input() max: number | null = null;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public form: FormGroup = this.formBuilder.group({
    from: [null],
    to: [null]
  })

  onChange = (range: RangeModel) => {
  }
  onTouched = () => {
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(change => {
        this.onChange(change);
      })
  }

  writeValue(range: RangeModel): void {
    if (range) {
      this.form.patchValue(range);
    } else {
      this.form.patchValue({from: null, to: null});
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
