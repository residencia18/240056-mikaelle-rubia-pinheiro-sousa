import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasCategoriaComponent } from './caracteristicas-categoria.component';

describe('CaracteristicasCategoriaComponent', () => {
  let component: CaracteristicasCategoriaComponent;
  let fixture: ComponentFixture<CaracteristicasCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaracteristicasCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaracteristicasCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
