import { TestBed } from '@angular/core/testing';
import { HostComponent } from './host.component';
describe('HostComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=host.component.spec.js.map