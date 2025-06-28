import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAnimation } from './bus-animation';

describe('BusAnimation', () => {
  let component: BusAnimation;
  let fixture: ComponentFixture<BusAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusAnimation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
