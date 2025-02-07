import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PerPageComponent = class PerPageComponent {
    ngOnInit() {
        this.getCo2EmissionPerPage('../har-files/dashboard.har');
    }
    getCo2EmissionPerPage(filePath) {
        // const swd =  new co2({ model: "swd", version: 4 });
        // const oneByte = new co2({ model: "1byte" });
        // const filesString = readFileSync(filePath, 'utf-8');
        // const har = JSON.parse(filesString);
        // const page = convert(har);
        // const emissions_swd_per_page = swd.perPage(page, true)
        // const emissions_1byte_per_page = oneByte.perPage(page, true)
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