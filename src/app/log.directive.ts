import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'
  }
})
export class LogDirective {


  constructor( private hostElementRef: ElementRef) { }

  onLog() {
    console.log('clicked')
    console.log(this.hostElementRef.nativeElement)
  }

}
