import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPetComponent } from './clientes-pet.component';

describe('ClientesPetComponent', () => {
  let component: ClientesPetComponent;
  let fixture: ComponentFixture<ClientesPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientesPetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
