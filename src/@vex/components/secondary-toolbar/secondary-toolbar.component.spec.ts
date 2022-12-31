import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecondaryToolbarComponent } from './secondary-toolbar.component';

describe('SecondaryToolbarComponent', () => {
  let component: SecondaryToolbarComponent;
  let fixture: ComponentFixture<SecondaryToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
