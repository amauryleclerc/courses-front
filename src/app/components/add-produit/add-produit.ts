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
    search: string;
    errorMessage: string;
    isNewProduit: boolean;
    success: boolean;
    constructor(private _produitService: ProduitService, private _categorieService: CategorieService, private _panierService: PanierService) { }
    ngOnInit() {
        this.isNewProduit = false;
        this.produits = [];
        this.categories = [];
        this.search = "";
        this.success = false;
        this.getCategories();
        this.produitSelect = new ProduitSelect(null, false, 1, null, "","",false);
    }

    onSearch() {
        console.log(this.search);
        if (this.search == null || this.search === "") {
            this.produits.length = 0;
        } else {
            this._produitService.searchProduits(this.search)
                .subscribe(
                produits => {
                    this.produits = produits;
                    if (this.produits.filter((produit) => {
                        return produit.libelle === this.search;
                    }).length > 0) {
                        this.isNewProduit = true;
                    } else {
                        this.isNewProduit = false;
                    }
                },
                error => this.errorMessage = <any>error);
        }
    }
    selectProduit(produit: Produit) {
        this.isNewProduit = false;
        this.produitSelect.produit = produit;

        this._panierService.getProduitSelect(produit.id).subscribe(
            produitSelect => { if (produitSelect) { this.produitSelect = produitSelect } },
            error => this.errorMessage = <any>error);
    }
    newProduit() {
        this.isNewProduit = true;
        if (this.categories[0]) {
            this.produitSelect.produit = new Produit(null, this.search, this.categories[0]);
        } else {
            this.produitSelect.produit = new Produit(null, this.search, null);
        }
    }
    onCategorieSelected(value: string) {
        this.produitSelect.produit.categorie = this.categories.find((categorie) => { return categorie.id === value });
        console.log(this.categories.find((categorie) => { return categorie.id === value }));
    }

    getCategories() {
        this._categorieService.getCategories()
            .subscribe(
            categories => this.categories = categories,
            error => this.errorMessage = <any>error);
    }
    ajouter() {
        this._panierService.addProduit(this.produitSelect)
            .subscribe(
            res => this.setSuccess(),
            error => this.errorMessage = <any>error);
    }
    setSuccess() {
        this.ngOnInit();
        this.success = true;
        setTimeout(() => { this.success = false }, 2000);
    }

}
