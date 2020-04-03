import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolCardComponent } from './carpool-card.component';

describe('CarpoolCardComponent', () => {
  let component: CarpoolCardComponent;
  let fixture: ComponentFixture<CarpoolCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpoolCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpoolCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
