import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarArquilojsonComponent } from './salvar-arquilojson.component';

describe('SalvarArquilojsonComponent', () => {
  let component: SalvarArquilojsonComponent;
  let fixture: ComponentFixture<SalvarArquilojsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalvarArquilojsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalvarArquilojsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
