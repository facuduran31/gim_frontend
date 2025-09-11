import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarIngresoComponent } from './validar-ingreso.component';

describe('ValidarIngresoComponent', () => {
  let component: ValidarIngresoComponent;
  let fixture: ComponentFixture<ValidarIngresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidarIngresoComponent]
    });
    fixture = TestBed.createComponent(ValidarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
