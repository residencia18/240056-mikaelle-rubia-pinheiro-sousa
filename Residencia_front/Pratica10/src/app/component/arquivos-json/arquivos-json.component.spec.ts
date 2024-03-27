import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivosJsonComponent } from './arquivos-json.component';

describe('ArquivosJsonComponent', () => {
  let component: ArquivosJsonComponent;
  let fixture: ComponentFixture<ArquivosJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArquivosJsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArquivosJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
