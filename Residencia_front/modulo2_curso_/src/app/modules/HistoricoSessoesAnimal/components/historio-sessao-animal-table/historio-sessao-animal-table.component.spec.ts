import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorioSessaoAnimalTableComponent } from './historio-sessao-animal-table.component';

describe('HistorioSessaoAnimalTableComponent', () => {
  let component: HistorioSessaoAnimalTableComponent;
  let fixture: ComponentFixture<HistorioSessaoAnimalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorioSessaoAnimalTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorioSessaoAnimalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
