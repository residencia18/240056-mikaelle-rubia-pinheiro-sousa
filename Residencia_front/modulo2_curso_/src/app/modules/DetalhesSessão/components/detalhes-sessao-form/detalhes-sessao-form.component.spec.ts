import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesSessaoFormComponent } from './detalhes-sessao-form.component';

describe('DetalhesSessaoFormComponent', () => {
  let component: DetalhesSessaoFormComponent;
  let fixture: ComponentFixture<DetalhesSessaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesSessaoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesSessaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
