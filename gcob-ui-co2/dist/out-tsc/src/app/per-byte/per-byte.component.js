import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { co2 } from "@tgwf/co2";
let PerByteComponent = class PerByteComponent {
    co2PerBytes;
    ngOnInit() {
        this.co2PerBytes = this.getCo2PerBytes(1000);
    }
    getCo2PerBytes(bytes) {
        const swdmV4 = new co2({ model: "swd", version: 4 });
        const estimate = swdmV4.perByte(bytes, true);
        return estimate;
    }
};
PerByteComponent = __decorate([
    Component({
        selector: 'app-per-byte',
        standalone: true,
        imports: [],
        templateUrl: './per-byte.component.html',
        styleUrl: './per-byte.component.scss'
    })
], PerByteComponent);
export { PerByteComponent };
//# sourceMappingURL=per-byte.component.js.map