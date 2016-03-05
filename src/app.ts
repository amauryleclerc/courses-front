import {bootstrap} from 'angular2/platform/browser';
import {CoursesFrontApp} from './app/courses-front';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(CoursesFrontApp, [
  ROUTER_PROVIDERS
]);
