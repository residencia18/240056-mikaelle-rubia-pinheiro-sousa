import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesSessaoTableComponent } from './detalhes-sessao-table.component';

describe('DetalhesSessaoTableComponent', () => {
  let component: DetalhesSessaoTableComponent;
  let fixture: ComponentFixture<DetalhesSessaoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesSessaoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesSessaoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
