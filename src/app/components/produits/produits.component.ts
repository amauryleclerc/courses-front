import {Component, OnInit} from 'angular2/core';
import {Produit} from './produit';
import {ProduitService} from './produit.service';

@Component({
    selector: 'produits',
    templateUrl: 'app/components/produits/produits.html',
    styleUrls: ['app/components/produits/produits.css'],
    providers: [],
    directives: [],
    pipes: []
})
export class ProduitsComponent implements OnInit {


    produits: Produit[];
    errorMessage : string;
    constructor(private _produitService: ProduitService) {
    }
    ngOnInit() {
        this.getHeroes();
    }
    getHeroes() {
    //    this.produits = [{id:"1", libelle:"pomme"},{id:"2", libelle:"poire"}];
    
        this._produitService.getProduits()
                     .subscribe(
                       heroes => this.produits = heroes,
                       error =>  this.errorMessage = <any>error);
    }

}