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

    edit: number;
    produits: Produit[];
    errorMessage: string;
    success: boolean;
    constructor(private _produitService: ProduitService) {
    }
    ngOnInit() {
        this.getProduits();
        this.edit = -1;
        this.success = false;
    }
    getProduits() {
        //    this.produits = [{id:"1", libelle:"pomme"},{id:"2", libelle:"poire"}];

        this._produitService.getProduits()
            .subscribe(
            produits => this.produits = produits,
            error => this.errorMessage = <any>error);
    }
    putProduit(produit: Produit) {
        this.edit = -1;
        this._produitService.updateProduit(produit)
            .subscribe(
            produit => this.setSuccess(),
            error => this.errorMessage = <any>error);

    }
    trierParLibelle() {
        this.produits.sort((a: Produit, b: Produit) => a.libelle.localeCompare(b.libelle));
    }
    trierParCategorie() {
        this.produits.sort((a: Produit, b: Produit) => a.categorie.libelle.localeCompare(b.categorie.libelle));
    }
    setSuccess() {
        this.success = true;
        setTimeout(() => this.success = false, 2000);
    }

}
