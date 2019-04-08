import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmUserdosdocumentsComponent } from './mdm-userdosdocuments.component';

describe('MdmUserdosdocumentsComponent', () => {
  let component: MdmUserdosdocumentsComponent;
  let fixture: ComponentFixture<MdmUserdosdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdmUserdosdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdmUserdosdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
