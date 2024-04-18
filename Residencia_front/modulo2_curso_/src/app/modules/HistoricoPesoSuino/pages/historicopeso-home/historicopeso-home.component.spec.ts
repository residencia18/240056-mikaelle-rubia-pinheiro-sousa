import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricopesoHomeComponent } from './historicopeso-home.component';

describe('HistoricopesoHomeComponent', () => {
  let component: HistoricopesoHomeComponent;
  let fixture: ComponentFixture<HistoricopesoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricopesoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricopesoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
