import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosDetalhesAtividadePesagemComponent } from './graficos-detalhes-atividade-pesagem.component';

describe('GraficosDetalhesAtividadePesagemComponent', () => {
  let component: GraficosDetalhesAtividadePesagemComponent;
  let fixture: ComponentFixture<GraficosDetalhesAtividadePesagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficosDetalhesAtividadePesagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficosDetalhesAtividadePesagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
