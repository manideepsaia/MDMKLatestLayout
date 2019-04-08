import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmUserComponent } from './mdm-user.component';

describe('MdmUserComponent', () => {
  let component: MdmUserComponent;
  let fixture: ComponentFixture<MdmUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdmUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
