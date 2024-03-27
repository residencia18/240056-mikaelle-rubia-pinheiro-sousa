import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoTableComponent } from './sessao-table.component';

describe('SessaoTableComponent', () => {
  let component: SessaoTableComponent;
  let fixture: ComponentFixture<SessaoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
