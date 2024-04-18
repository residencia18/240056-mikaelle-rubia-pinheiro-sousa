import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricopesoFormComponent } from './historicopeso-form.component';

describe('HistoricopesoFormComponent', () => {
  let component: HistoricopesoFormComponent;
  let fixture: ComponentFixture<HistoricopesoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricopesoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricopesoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
