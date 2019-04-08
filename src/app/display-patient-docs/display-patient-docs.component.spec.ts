import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPatientDocsComponent } from './display-patient-docs.component';

describe('DisplayPatientDocsComponent', () => {
  let component: DisplayPatientDocsComponent;
  let fixture: ComponentFixture<DisplayPatientDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPatientDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPatientDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
