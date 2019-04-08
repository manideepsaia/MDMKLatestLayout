import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigndostoattorneyComponent } from './assigndostoattorney.component';

describe('AssigndostoattorneyComponent', () => {
  let component: AssigndostoattorneyComponent;
  let fixture: ComponentFixture<AssigndostoattorneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigndostoattorneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigndostoattorneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
