import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {

  queryParam = input<string>('myapp');
  // appSafeLink = input<string>('appSafeLink'); if name is the same as directive selector, no need to additional input in tag instead you can use it like appSafeLink="value"
  // queryParam = input<string>('myapp', {alias: 'appSafeLink'}); using alias, you can use it like appSafeLink="value" like above but if you don't want to change name of input variable
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)

  constructor() {
    console.log('safe link directive is active');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Are you sure you want to leave this page?');
    if(wantsToLeave) {
      // const address = (event.target as HTMLAnchorElment).href;
      const address = this.hostElementRef.nativeElement.href;
      // (event.target as HTMLAnchorElement).href =  address + '?from=' + this.queryParam();
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault()
  }

}
