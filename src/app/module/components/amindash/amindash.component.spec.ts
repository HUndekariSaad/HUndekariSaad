/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AmindashComponent } from './amindash.component';

describe('AmindashComponent', () => {
  let component: AmindashComponent;
  let fixture: ComponentFixture<AmindashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmindashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmindashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
