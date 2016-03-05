import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Produits} from './components/produits/produits';
import {Panier} from './components/panier/panier';

@Component({
  selector: 'courses-front-app',
  providers: [],
  templateUrl: 'app/courses-front.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
    {path:'/panier', name: 'Panier', component: Panier, useAsDefault: true},
  {path:'/produits', name: 'Produits', component: Produits}
])
export class CoursesFrontApp {
  defaultMeaning: number = 42;
  
  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
