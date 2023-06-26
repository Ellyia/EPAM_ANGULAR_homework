import { MockBuilder, MockRender } from 'ng-mocks';
import { IsAuthenticatedDirective } from './ifAuthenticated.directive';

describe('IsAuthenticatedDirective', () => {
  beforeEach(() => MockBuilder(IsAuthenticatedDirective));

  it('hides and renders its content', () => {
    const fixture = MockRender(
      `
        <div *IsAuthenticatedDirective="value">
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
