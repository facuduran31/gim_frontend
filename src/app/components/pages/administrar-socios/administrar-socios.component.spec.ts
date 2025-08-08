import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarSociosComponent } from './administrar-socios.component';

describe('AdministrarSociosComponent', () => {
  let component: AdministrarSociosComponent;
  let fixture: ComponentFixture<AdministrarSociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarSociosComponent]
    });
    fixture = TestBed.createComponent(AdministrarSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
