import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ProduitsComponent} from './components/produits/produits.component';
import {AddProduit} from './components/add-produit/add-produit';
import {PanierComponent} from './components/panier/panier.component';
import {ProduitService} from './components/produits/produit.service';
import {ProduitsSelectService} from './components/panier/produits-select.service';
import {PanierService} from './components/panier/panier.service';
import {CategorieService} from './components/categories/categorie.service';
import {Categories} from './components/categories/categories';
import {HTTP_PROVIDERS}    from 'angular2/http';
import 'rxjs/Rx';
declare var pdfMake: any;

@Component({
    selector: 'courses-front-app',
    providers: [ProduitService, PanierService, CategorieService, ProduitsSelectService, HTTP_PROVIDERS],
    templateUrl: 'app/courses-front.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: []
})
@RouteConfig([
    { path: '/panier', name: 'Panier', component: PanierComponent, useAsDefault: true },
    { path: '/produits', name: 'Produits', component: ProduitsComponent },
    { path: '/add-produit', name: 'AddProduit', component: AddProduit },
    { path: '/categories', name: 'Categories', component: Categories }
])
export class CoursesFrontApp {
 
   public static get API_ENDPOINT(): string { return 'http://localhost:8090/api/'; }


}
