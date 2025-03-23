import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecesitoAyudaComponent } from './necesito-ayuda.component';

describe('NecesitoAyudaComponent', () => {
  let component: NecesitoAyudaComponent;
  let fixture: ComponentFixture<NecesitoAyudaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NecesitoAyudaComponent]
    });
    fixture = TestBed.createComponent(NecesitoAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
