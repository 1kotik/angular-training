import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[defaultImage]'
})
export class DefaultImageDirective {
  @Input() public defaultImageLink = '../../../assets/images/default-image.png';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  public onError() {
    this.el.nativeElement.src = this.defaultImageLink;
  }
}
