import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { hosting } from "@tgwf/co2";
let HostComponent = class HostComponent {
    domain = 'rabobank.nl';
    isGreen;
    ngOnInit() {
        this.isGreen = this.getHostStatus(this.domain);
    }
    getHostStatus(domain) {
        let response = hosting.check(domain, 'gcob-co2-check');
        console.log(response);
        return response;
    }
};
HostComponent = __decorate([
    Component({
        selector: 'app-host',
        standalone: true,
        imports: [],
        templateUrl: './host.component.html',
        styleUrl: './host.component.scss'
    })
], HostComponent);
export { HostComponent };
//# sourceMappingURL=host.component.js.map