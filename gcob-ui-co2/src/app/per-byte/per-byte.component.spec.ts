import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerByteComponent } from './per-byte.component.js';

describe('PerByteComponent', () => {
  let component: PerByteComponent;
  let fixture: ComponentFixture<PerByteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerByteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerByteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
