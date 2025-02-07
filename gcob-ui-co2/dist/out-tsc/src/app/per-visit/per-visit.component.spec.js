import { TestBed } from '@angular/core/testing';
import { PerVisitComponent } from './per-visit.component';
describe('PerVisitComponent', () => {
    let component;
    let fixture;
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
//# sourceMappingURL=per-visit.component.spec.js.map