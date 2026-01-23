import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { DemoComponent } from './app/demo.component';

bootstrapApplication(DemoComponent, appConfig).catch(err => console.error(err));
