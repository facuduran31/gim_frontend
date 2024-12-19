import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGimnasioComponent } from './form-gimnasio.component';

describe('FormGimnasioComponent', () => {
  let component: FormGimnasioComponent;
  let fixture: ComponentFixture<FormGimnasioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormGimnasioComponent]
    });
    fixture = TestBed.createComponent(FormGimnasioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
