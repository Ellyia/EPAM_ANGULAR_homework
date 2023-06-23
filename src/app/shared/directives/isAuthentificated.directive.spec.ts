import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MockBuilder, MockRender } from 'ng-mocks';

@Directive({
  selector: '[appAuthTestDirective]'
})
class IsAuthTestDirective {
  public constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainerRef: ViewContainerRef
  ) {}

  @Input() public set appAuthTestDirective(value: any) {
    if (value) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}

describe('IsAuthTestDirective', () => {
  beforeEach(() => MockBuilder(IsAuthTestDirective));

  it('hides and renders its content', () => {
    const fixture = MockRender(
      `
        <div *appAuthTestDirective="value">
          content
        </div>
    `,
      {
        value: false
      }
    );

    expect(fixture.nativeElement.innerHTML).not.toContain('content');

    fixture.componentInstance.value = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain('content');

    fixture.componentInstance.value = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toContain('content');
  });
});
