import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneThumbnailComponent } from './milestone-thumbnail.component';

describe('MilestoneThumbnailComponent', () => {
  let component: MilestoneThumbnailComponent;
  let fixture: ComponentFixture<MilestoneThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
