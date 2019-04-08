import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDocumnetsComponent } from './map-documnets.component';

describe('MapDocumnetsComponent', () => {
  let component: MapDocumnetsComponent;
  let fixture: ComponentFixture<MapDocumnetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDocumnetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDocumnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
