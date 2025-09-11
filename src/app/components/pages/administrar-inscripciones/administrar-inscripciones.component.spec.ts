import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarInscripcionesComponent } from './administrar-inscripciones.component';

describe('AdministrarInscripcionesComponent', () => {
  let component: AdministrarInscripcionesComponent;
  let fixture: ComponentFixture<AdministrarInscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarInscripcionesComponent]
    });
    fixture = TestBed.createComponent(AdministrarInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
