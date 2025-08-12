import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from "./auth.model";
import { AuthService } from "./auth.service";

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private templateRef = inject(TemplateRef) // TemplateRef is used to access the template where this directive is applied - only template
  private viewContainerRef = inject(ViewContainerRef); // ViewContainerRef is used to manipulate the view where this directive is applied - can add or remove elements
  constructor(private authService: AuthService) {
    effect(() => {
      if(this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear()
      }
    });
  }

}
