import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoHomeComponent } from './suino-home.component';

describe('SuinoHomeComponent', () => {
  let component: SuinoHomeComponent;
  let fixture: ComponentFixture<SuinoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuinoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
