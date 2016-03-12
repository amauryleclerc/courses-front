import {Produit} from '../produits/produit';

export class ProduitSelect {
  constructor(
    public id:string,
    public pris:boolean,
    public quantite:number,
    public produit:Produit) { }
}

