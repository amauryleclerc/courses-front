import {Component, OnInit} from 'angular2/core';
import {PanierProduit} from './panier';
import {PanierService} from './panier.service';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AddProduit} from '../add-produit/add-produit';
@Component({
    selector: 'panier',
    templateUrl: 'app/components/panier/panier.html',
    styleUrls: ['app/components/panier/panier.css'],
    providers: [],
    directives: [ROUTER_DIRECTIVES],
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
    archiver(){
           this._panierService.archiver()
            .subscribe(
            res => this.getPanier(),
            error => this.errorMessage = <any>error);
    }
}