import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoTableComponent } from './suino-table.component';

describe('SuinoTableComponent', () => {
  let component: SuinoTableComponent;
  let fixture: ComponentFixture<SuinoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuinoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
