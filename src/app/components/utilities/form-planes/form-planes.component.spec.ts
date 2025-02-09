import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanesComponent } from './form-planes.component';

describe('FormPlanesComponent', () => {
  let component: FormPlanesComponent;
  let fixture: ComponentFixture<FormPlanesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPlanesComponent]
    });
    fixture = TestBed.createComponent(FormPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
