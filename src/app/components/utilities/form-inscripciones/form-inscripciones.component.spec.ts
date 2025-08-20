import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInscripcionesComponent } from './form-inscripciones.component';

describe('FormInscripcionesComponent', () => {
  let component: FormInscripcionesComponent;
  let fixture: ComponentFixture<FormInscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormInscripcionesComponent]
    });
    fixture = TestBed.createComponent(FormInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
