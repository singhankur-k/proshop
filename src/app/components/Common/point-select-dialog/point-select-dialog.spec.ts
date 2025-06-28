import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSelectDialog } from './point-select-dialog';

describe('PointSelectDialog', () => {
  let component: PointSelectDialog;
  let fixture: ComponentFixture<PointSelectDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointSelectDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointSelectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
