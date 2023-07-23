import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// const MAP_TAG = 'map-custom-component';

// createApplication().then((appRef) => {
//   const elementConstructor = createCustomElement(AppComponent, {
//     injector: appRef.injector,
//   });
//   if (!customElements.get(MAP_TAG)) {
//     customElements.define(MAP_TAG, elementConstructor);
//     console.log(`Custom component ${MAP_TAG} was registered`);
//   }
// });
