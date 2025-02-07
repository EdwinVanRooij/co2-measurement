import { TestBed } from '@angular/core/testing';
import { PerPageComponent } from './per-page.component';
describe('PerPageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PerPageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PerPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=per-page.component.spec.js.map