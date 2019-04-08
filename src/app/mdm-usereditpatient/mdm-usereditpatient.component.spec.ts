import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmUsereditpatientComponent } from './mdm-usereditpatient.component';

describe('MdmUsereditpatientComponent', () => {
  let component: MdmUsereditpatientComponent;
  let fixture: ComponentFixture<MdmUsereditpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdmUsereditpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdmUsereditpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
