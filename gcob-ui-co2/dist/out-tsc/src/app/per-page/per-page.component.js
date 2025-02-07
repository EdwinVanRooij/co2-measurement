import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { co2 } from '@tgwf/co2';
import * as pageXray from 'pagexray';
let PerPageComponent = class PerPageComponent {
    http;
    pageData;
    constructor(http) {
        this.http = http;
    }
    ngOnInit() {
        this.getCo2EmissionPerPage('../har-files/dashboard.har');
    }
    getCo2EmissionPerPage(pagePath) {
        const swd = new co2({ model: "swd", version: 4 });
        const oneByte = new co2({ model: "1byte" });
        this.http.get(pagePath, { responseType: 'text' })
            .subscribe({
            next: (data) => {
                const har = JSON.parse(data);
                let a = pageXray.convert(har);
                const emissions_swd_per_page = swd.perPage(a, true);
                const emissions_1byte_per_page = oneByte.perPage(a, true);
            }
        });
    }
};
PerPageComponent = __decorate([
    Component({
        selector: 'app-per-page',
        standalone: true,
        imports: [],
        templateUrl: './per-page.component.html',
        styleUrl: './per-page.component.scss'
    })
], PerPageComponent);
export { PerPageComponent };
//# sourceMappingURL=per-page.component.js.map