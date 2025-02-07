import { TestBed } from '@angular/core/testing';
import { AverageComponent } from './average.component.js';
describe('AverageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AverageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AverageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=average.component.spec.js.map