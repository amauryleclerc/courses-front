
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {PanierProduit}           from './panier';
import {ProduitSelect}           from './produitSelect';
import {Observable}     from 'rxjs/Observable';
@Injectable()
export class PanierService {
    constructor(private http: Http) { }


    private _panierUrl = 'http://localhost:8090/api/panier';
    private _panierArchiverUrl = 'http://localhost:8090/api/panier/archiver';
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

