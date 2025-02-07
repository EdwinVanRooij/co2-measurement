import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes.js';
export const appConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
//# sourceMappingURL=app.config.js.map