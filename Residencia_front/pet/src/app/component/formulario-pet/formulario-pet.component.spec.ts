import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPetComponent } from './formulario-pet.component';

describe('FormularioPetComponent', () => {
  let component: FormularioPetComponent;
  let fixture: ComponentFixture<FormularioPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioPetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
