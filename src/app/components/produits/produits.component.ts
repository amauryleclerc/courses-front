import {Component, OnInit} from 'angular2/core';
import {Produit} from './produit';
import {Categorie} from '../categories/categorie';
import {CategorieService} from '../categories/categorie.service';
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
    categories:Categorie[];
    errorMessage: string;
    success: boolean;
    constructor(private _produitService: ProduitService, private _categorieService: CategorieService) {
    }
    ngOnInit() {
        this.getProduits();
        this.getCategories();
        this.edit = -1;
        this.success = false;
    }
    getProduits() {
        this._produitService.getProduits()
            .subscribe(
            produits => this.produits = produits,
            error => this.errorMessage = <any>error);
    }
    getCategories() {
          this._categorieService.getCategories()
            .subscribe(
            categories => this.categories = categories,
            error => this.errorMessage = <any>error);
    }
    putProduit(produit: Produit) {
        this.edit = -1;
        this._produitService.updateProduit(produit)
            .subscribe(
            produit => this.setSuccess(),
            error => this.errorMessage = <any>error);
    }
    onCategorieSelected(produit: Produit, value: string){
        produit.categorie = this.categories.find((categorie)=>categorie.id==value);
        
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
