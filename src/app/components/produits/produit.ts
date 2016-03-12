import {Categorie}           from '../categories/categorie';
export class Produit {
  constructor(
    public id:string,
    public libelle:string, 
    public categorie:Categorie) { }
}

