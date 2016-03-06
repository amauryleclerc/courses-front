import {Component, OnInit} from 'angular2/core';
import {PanierProduit} from './panier';
import {PanierService} from './panier.service';
@Component({
    selector: 'panier',
    templateUrl: 'app/components/panier/panier.html',
    styleUrls: ['app/components/panier/panier.css'],
    providers: [],
    directives: [],
    pipes: []
})
export class PanierComponent implements OnInit {
    panier: PanierProduit;
    errorMessage: string;
    constructor(private _panierService: PanierService) { }
    ngOnInit() {
        this.getPanier();
    }
    getPanier() {
        this._panierService.getCurrent()
            .subscribe(
            panier => this.panier = panier,
            error => this.errorMessage = <any>error);
      
    }
    debug(){
        console.log(this.panier);
    }
}