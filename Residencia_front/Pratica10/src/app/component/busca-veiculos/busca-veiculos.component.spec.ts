import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaVeiculosComponent } from './busca-veiculos.component';

describe('BuscaVeiculosComponent', () => {
  let component: BuscaVeiculosComponent;
  let fixture: ComponentFixture<BuscaVeiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscaVeiculosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscaVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
