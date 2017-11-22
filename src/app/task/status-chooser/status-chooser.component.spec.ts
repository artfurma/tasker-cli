/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusChooserComponent } from './status-chooser.component';

describe('StatusChooserComponent', () => {
  let component: StatusChooserComponent;
  let fixture: ComponentFixture<StatusChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
