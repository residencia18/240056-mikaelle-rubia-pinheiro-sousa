import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSessoesAnimalComponent } from './historico-sessoes-animal.component';

describe('HistoricoSessoesAnimalComponent', () => {
  let component: HistoricoSessoesAnimalComponent;
  let fixture: ComponentFixture<HistoricoSessoesAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoSessoesAnimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoSessoesAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
