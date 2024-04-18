import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoHomeComponent } from './sessao-home.component';

describe('SessaoHomeComponent', () => {
  let component: SessaoHomeComponent;
  let fixture: ComponentFixture<SessaoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
