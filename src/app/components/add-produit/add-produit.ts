import {Component, OnInit} from 'angular2/core';
import {Produit}           from '../produits/produit';
import {ProduitSelect}           from '../panier/produitSelect';
import {Categorie}           from '../categories/categorie';
import {CategorieService}           from '../categories/categorie.service';
import {ProduitService}           from '../produits/produit.service';
import {PanierService}          from '../panier/panier.service';


@Component({
    selector: 'add-produit',
    templateUrl: 'app/components/add-produit/add-produit.html',
    styleUrls: ['app/components/add-produit/add-produit.css'],
    providers: [],
    directives: [],
    pipes: []
})
export class AddProduit {
    produitSelect: ProduitSelect;
    produits: Produit[];
    categories: Categorie[];
    quantite: number;
    search: string;
    errorMessage: string;
    isNewProduit: boolean;
    constructor(private _produitService: ProduitService, private _categorieService: CategorieService, private _panierService: PanierService) { }
    ngOnInit() {
        this.quantite = 1;
        this.isNewProduit = false;
        this.getCategories();
        this.produitSelect = new ProduitSelect(null, false, 1, null);
    }



    onSearch() {
        console.log(this.search);
        this._produitService.searchProduits(this.search)
            .subscribe(
            produits => this.produits = produits,
            error => this.errorMessage = <any>error);
    }
    selectProduit(produit : Produit) {
        console.log(produit);
        this.produitSelect.produit = produit;
    }
    newProduit() {
        this.isNewProduit = true;
        if(this.categories){
              this.produitSelect.produit = new Produit(null, this.search, this.categories[0]);
        }else{
              this.produitSelect.produit = new Produit(null, this.search, null);
        }
    }
    onCategorieSelected(){
        
    }

    getCategories() {
        this._categorieService.getCategories()
            .subscribe(
            categories => this.categories = categories,
            error => this.errorMessage = <any>error);
    }
    ajouter(){
          this._panierService.addProduit(this.produitSelect)
            .subscribe(
            res => console.log(res),
            error => this.errorMessage = <any>error);
    }

}
