import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProduitsComponent} from './components/produits/produits.component';
import {AddProduit} from './components/add-produit/add-produit';
import {PanierComponent} from './components/panier/panier.component';
import {ProduitService} from './components/produits/produit.service';
import {PanierService} from './components/panier/panier.service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import 'rxjs/Rx';

@Component({
  selector: 'courses-front-app',
  providers: [ProduitService,PanierService, HTTP_PROVIDERS],
  templateUrl: 'app/courses-front.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
    {path:'/panier', name: 'Panier', component: PanierComponent, useAsDefault: true},
  {path:'/produits', name: 'Produits', component: ProduitsComponent},
  {path:'/add-produit', name: 'AddProduit', component: AddProduit}
])
export class CoursesFrontApp {
  defaultMeaning: number = 42;
  
  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
