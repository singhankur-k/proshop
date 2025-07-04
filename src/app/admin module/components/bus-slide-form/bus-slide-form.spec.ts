import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSlideForm } from './bus-slide-form';

describe('BusSlideForm', () => {
  let component: BusSlideForm;
  let fixture: ComponentFixture<BusSlideForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusSlideForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusSlideForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
