import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetTableComponent } from './widget-table.component';

describe('WidgetTableComponent', () => {
  let component: WidgetTableComponent<any>;
  let fixture: ComponentFixture<WidgetTableComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
