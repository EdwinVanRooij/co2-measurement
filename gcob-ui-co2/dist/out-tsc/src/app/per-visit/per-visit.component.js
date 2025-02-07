import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { co2 } from '@tgwf/co2';
let PerVisitComponent = class PerVisitComponent {
    co2PerVisit;
    numberOfVisits;
    ngOnInit() {
        this.numberOfVisits = 100;
        this.co2PerVisit = this.getCo2PerVisit(this.numberOfVisits);
    }
    getCo2PerVisit(numberOfVisits) {
        const swdmV4 = new co2({ model: "swd", version: 4 });
        const estimate = swdmV4.perVisit(numberOfVisits, true);
        return estimate;
    }
};
PerVisitComponent = __decorate([
    Component({
        selector: 'app-per-visit',
        standalone: true,
        imports: [],
        templateUrl: './per-visit.component.html',
        styleUrl: './per-visit.component.scss'
    })
], PerVisitComponent);
export { PerVisitComponent };
//# sourceMappingURL=per-visit.component.js.map