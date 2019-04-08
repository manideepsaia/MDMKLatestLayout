import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDosComponent } from './map-dos.component';

describe('MapDosComponent', () => {
  let component: MapDosComponent;
  let fixture: ComponentFixture<MapDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
