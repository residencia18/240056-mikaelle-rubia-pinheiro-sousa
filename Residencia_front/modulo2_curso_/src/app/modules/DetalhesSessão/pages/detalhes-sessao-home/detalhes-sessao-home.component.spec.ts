import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesSessaoHomeComponent } from './detalhes-sessao-home.component';

describe('DetalhesSessaoHomeComponent', () => {
  let component: DetalhesSessaoHomeComponent;
  let fixture: ComponentFixture<DetalhesSessaoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesSessaoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesSessaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
