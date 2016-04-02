import {Component, OnInit} from 'angular2/core';
import {PanierProduit} from './panier';
import {PanierService} from './panier.service';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AddProduit} from '../add-produit/add-produit';
import {ProduitSelect} from './produitSelect';
import {ProduitsSelectService} from './produits-select.service';
import {CategorieService} from '../categories/categorie.service';
import {Categorie} from '../categories/categorie';
declare var pdfMake: any;

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
categories: Categorie[];
errorMessage: string;
constructor(private _panierService: PanierService,private _categorieService: CategorieService,  private _produitsSelectService: ProduitsSelectService) { }
ngOnInit() {
this.getPanier();
this.getCategories();
}
getPanier() {
this._panierService.getCurrent()
.subscribe(
panier => {this.panier = panier;
this.trierParPosition()},
error => this.errorMessage = <any>error);

}
getCategories() {
this._categorieService.getCategories()
.subscribe(
categories => this.categories = categories.sort((a:Categorie,b:Categorie)=> a.position - b.position),
error => this.errorMessage = <any>error);
}
archiver() {
if(confirm("Etes vous sûr ?")){
this._panierService.archiver()
.subscribe(
res => this.getPanier(),
error => this.errorMessage = <any>error)}
}
exporter() {

let content = [];
this.categories.forEach((categorie)=>{
content.push({text:" ", style:"categorie"});
this.panier.produitsSelect.filter((produitSelect) =>produitSelect.produit.categorie.id === categorie.id )
.map((element)=>{if(element.quantite>1) {
return {text :element.produit.libelle+" x"+element.quantite }
}else{
return {text :element.produit.libelle }
}
}).forEach((element)=>{
content.push(element);
});
});
console.log(content);
let docDefinition = { content: content,  styles : {
categorie: {
fontSize: 5,
bold: true
}
}};
pdfMake.createPdf(docDefinition).open();
}


supprimer(produit: ProduitSelect){
this._produitsSelectService.supprimer(produit)
.subscribe(
res => this.getPanier(),
error => this.errorMessage = <any>error);
}
trierParLibelle() {
this.panier.produitsSelect.sort((a: ProduitSelect, b: ProduitSelect) => a.produit.libelle.localeCompare(b.produit.libelle));
}
trierParCategorie() {
this.panier.produitsSelect.sort((a: ProduitSelect, b: ProduitSelect) => a.produit.categorie.libelle.localeCompare(b.produit.categorie.libelle));
}
trierParPosition() {
this.trierParCategorie();
this.panier.produitsSelect.sort((a: ProduitSelect, b: ProduitSelect) => a.produit.categorie.position - b.produit.categorie.position);
}
}