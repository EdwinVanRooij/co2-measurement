import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerVisitComponent } from './per-visit.component.js';

describe('PerVisitComponent', () => {
  let component: PerVisitComponent;
  let fixture: ComponentFixture<PerVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
