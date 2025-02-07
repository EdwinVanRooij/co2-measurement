import { TestBed } from '@angular/core/testing';
import { PerByteComponent } from './per-byte.component';
describe('PerByteComponent', () => {
    let component;
    let fixture;
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
//# sourceMappingURL=per-byte.component.spec.js.map