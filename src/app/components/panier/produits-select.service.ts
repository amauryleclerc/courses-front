
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {PanierProduit}           from './panier';
import {ProduitSelect}           from './produitSelect';
import {Observable}     from 'rxjs/Observable';
import {CoursesFrontApp}     from '../../courses-front';
@Injectable()
export class ProduitsSelectService {
    constructor(private http: Http) { }


    private _panierUrl = `${CoursesFrontApp.API_ENDPOINT}produits-select`;
  
    supprimer(produit: ProduitSelect) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.delete(this._panierUrl+"/"+produit.id, { headers: headers })
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

