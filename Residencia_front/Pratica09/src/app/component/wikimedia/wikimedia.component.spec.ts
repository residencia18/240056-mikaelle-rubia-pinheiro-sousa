import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikimediaComponent } from './wikimedia.component';

describe('WikimediaComponent', () => {
  let component: WikimediaComponent;
  let fixture: ComponentFixture<WikimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikimediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WikimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
