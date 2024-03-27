import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPesoTableComponent } from './historico-peso-table.component';

describe('HistoricoPesoTableComponent', () => {
  let component: HistoricoPesoTableComponent;
  let fixture: ComponentFixture<HistoricoPesoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoPesoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoPesoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
