import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[allowedInputRange]'
})
export class AllowedInputRangeDirective {
  @Input() public rangeMin: number | null = null;
  @Input() public rangeMax: number | null = null;

  constructor(private el: ElementRef<HTMLImageElement>) {
  }

  @HostListener('input')
  public onInput() {
    if (!(this.el.nativeElement instanceof HTMLInputElement)) {
      return;
    }
    const inputElement: HTMLInputElement = this.el.nativeElement;
    const inputValue = parseFloat(inputElement.value);
    if (isNaN(inputValue)) {
      return;
    }
    if (this.rangeMax !== null && inputValue > this.rangeMax) {
      inputElement.value = this.rangeMax.toString();
      inputElement.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('blur')
  public onBlur() {
    if (!(this.el.nativeElement instanceof HTMLInputElement)) {
      return;
    }
    const inputElement: HTMLInputElement = this.el.nativeElement;
    const inputValue = parseFloat(inputElement.value);
    if (isNaN(inputValue)) {
      return;
    }
    if (this.rangeMin !== null && inputValue < this.rangeMin) {
      inputElement.value = this.rangeMin.toString();
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
