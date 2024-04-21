import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleSuinosComponent } from './controle-suinos.component';

describe('ControleSuinosComponent', () => {
  let component: ControleSuinosComponent;
  let fixture: ComponentFixture<ControleSuinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControleSuinosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControleSuinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
