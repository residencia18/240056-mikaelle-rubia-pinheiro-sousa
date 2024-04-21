import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleSuinoFormComponent } from './controle-suino-form.component';

describe('ControleSuinoFormComponent', () => {
  let component: ControleSuinoFormComponent;
  let fixture: ComponentFixture<ControleSuinoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControleSuinoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControleSuinoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
