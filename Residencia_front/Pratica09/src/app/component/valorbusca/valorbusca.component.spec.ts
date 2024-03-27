import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorbuscaComponent } from './valorbusca.component';

describe('ValorbuscaComponent', () => {
  let component: ValorbuscaComponent;
  let fixture: ComponentFixture<ValorbuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValorbuscaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValorbuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
