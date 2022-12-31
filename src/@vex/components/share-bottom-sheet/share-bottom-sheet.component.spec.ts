import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShareBottomSheetComponent } from './share-bottom-sheet.component';

describe('ShareBottomSheetComponent', () => {
  let component: ShareBottomSheetComponent;
  let fixture: ComponentFixture<ShareBottomSheetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShareBottomSheetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
