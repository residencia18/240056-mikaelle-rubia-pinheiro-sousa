import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosSuinosComponent } from './graficos-suinos.component';

describe('GraficosSuinosComponent', () => {
  let component: GraficosSuinosComponent;
  let fixture: ComponentFixture<GraficosSuinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficosSuinosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficosSuinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
