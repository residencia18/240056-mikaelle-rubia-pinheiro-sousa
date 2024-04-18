import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEscolhidaComponent } from './categoria-escolhida.component';

describe('CategoriaEscolhidaComponent', () => {
  let component: CategoriaEscolhidaComponent;
  let fixture: ComponentFixture<CategoriaEscolhidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaEscolhidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaEscolhidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
