import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationInputComponent } from './durationInput.component';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DurationInputComponent]
    });
    fixture = TestBed.createComponent(DurationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
