import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appIsAuthenticated]'
})
export class IsAuthenticatedDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appIsAuthenticated(isAuth: boolean) {
    if (isAuth) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!isAuth) {
      this.viewContainer.clear();
    }
  }
}
