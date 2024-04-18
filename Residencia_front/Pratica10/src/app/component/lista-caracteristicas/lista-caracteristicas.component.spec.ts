import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCaracteristicasComponent } from './lista-caracteristicas.component';

describe('ListaCaracteristicasComponent', () => {
  let component: ListaCaracteristicasComponent;
  let fixture: ComponentFixture<ListaCaracteristicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaCaracteristicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
