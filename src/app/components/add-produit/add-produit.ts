import {Component, OnInit} from 'angular2/core';
import {Produit}           from '../produits/produit';
import {ProduitService}           from '../produits/produit.service';



@Component({
    selector: 'add-produit',
    templateUrl: 'app/components/add-produit/add-produit.html',
    styleUrls: ['app/components/add-produit/add-produit.css'],
    providers: [],
    directives: [],
    pipes: []
})
export class AddProduit {

    produits: Produit[];
    search: string;
    errorMessage : string;
    constructor(private _produitService: ProduitService) { }
    ngOnInit() {
       
    }



    onSearch() {
        console.log(this.search);
        this._produitService.searchProduits(this.search)
                     .subscribe(
                       produits => this.produits = produits,
                       error =>  this.errorMessage = <any>error);
    }

}
