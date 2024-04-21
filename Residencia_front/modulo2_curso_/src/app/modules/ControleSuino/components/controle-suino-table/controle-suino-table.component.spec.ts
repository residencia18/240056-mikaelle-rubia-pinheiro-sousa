import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleSuinoTableComponent } from './controle-suino-table.component';

describe('ControleSuinoTableComponent', () => {
  let component: ControleSuinoTableComponent;
  let fixture: ComponentFixture<ControleSuinoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControleSuinoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControleSuinoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
