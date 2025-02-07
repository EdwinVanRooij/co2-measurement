import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HostComponent } from '../app/host/host.component.js';
import { PerByteComponent } from '../app/per-byte/per-byte.component.js';
import { PerVisitComponent } from './per-visit/per-visit.component.js';
import { PerPageComponent } from './per-page/per-page.component.js';
let AppComponent = class AppComponent {
    title = 'gcob-ui-co2';
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [RouterOutlet, HostComponent, PerByteComponent, PerVisitComponent, PerPageComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.scss'
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map