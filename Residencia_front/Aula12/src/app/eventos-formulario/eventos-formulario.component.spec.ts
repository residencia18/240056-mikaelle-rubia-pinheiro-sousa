import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosFormularioComponent } from './eventos-formulario.component';

describe('EventosFormularioComponent', () => {
  let component: EventosFormularioComponent;
  let fixture: ComponentFixture<EventosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
