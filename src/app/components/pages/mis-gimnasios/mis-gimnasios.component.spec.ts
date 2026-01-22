import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisGimnasiosComponent } from './mis-gimnasios.component';

describe('MisGimnasiosComponent', () => {
  let component: MisGimnasiosComponent;
  let fixture: ComponentFixture<MisGimnasiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisGimnasiosComponent],
    });
    fixture = TestBed.createComponent(MisGimnasiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
