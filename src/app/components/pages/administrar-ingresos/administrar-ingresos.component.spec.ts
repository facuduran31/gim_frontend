import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarIngresosComponent } from './administrar-ingresos.component';

describe('AdministrarIngresosComponent', () => {
  let component: AdministrarIngresosComponent;
  let fixture: ComponentFixture<AdministrarIngresosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarIngresosComponent],
    });
    fixture = TestBed.createComponent(AdministrarIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
