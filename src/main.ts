import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// document.addEventListener('hidden.bs.modal', function (event) {
//   // Снимаем фокус с активного элемента
//   if (document.activeElement) {
//     document.activeElement.blur();
//   }
// });
