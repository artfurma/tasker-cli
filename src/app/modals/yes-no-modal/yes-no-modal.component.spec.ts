/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { YesNoModalComponent } from './yes-no-modal.component';

describe('YesNoModalComponent', () => {
  let component: YesNoModalComponent;
  let fixture: ComponentFixture<YesNoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
