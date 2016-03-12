
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {PanierProduit}           from './panier';
import {ProduitSelect}           from './produitSelect';
import {Observable}     from 'rxjs/Observable';
import {CoursesFrontApp}     from '../../courses-front';
@Injectable()
export class PanierService {
    constructor(private http: Http) { }


    private _panierUrl = `${CoursesFrontApp.API_ENDPOINT}panier`;
    private _panierArchiverUrl = `${CoursesFrontApp.API_ENDPOINT}panier/archiver`;
    getCurrent() {
        return this.http.get(this._panierUrl)
            .map(res => <PanierProduit>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    archiver() {
        return this.http.get(this._panierArchiverUrl)
           // .map(res => <PanierProduit>res)
            .do(data => console.log(data))
            .catch(this.handleError);
    }
  
    addProduit(produit: ProduitSelect) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.post(this._panierUrl, JSON.stringify(produit), { headers: headers })
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

