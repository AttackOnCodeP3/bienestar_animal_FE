import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// import function to register Swiper custom elements
import { register as registerSwiperElements } from 'swiper/element/bundle';
// register Swiper custom elements
registerSwiperElements();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
