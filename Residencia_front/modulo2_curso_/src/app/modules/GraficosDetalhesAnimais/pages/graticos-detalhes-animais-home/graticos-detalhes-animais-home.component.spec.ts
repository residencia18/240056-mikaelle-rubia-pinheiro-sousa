import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraticosDetalhesAnimaisHomeComponent } from './graticos-detalhes-animais-home.component';

describe('GraticosDetalhesAnimaisHomeComponent', () => {
  let component: GraticosDetalhesAnimaisHomeComponent;
  let fixture: ComponentFixture<GraticosDetalhesAnimaisHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraticosDetalhesAnimaisHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraticosDetalhesAnimaisHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
