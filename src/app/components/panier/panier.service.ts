
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {PanierProduit}           from './panier';
import {ProduitSelect}           from './produitSelect';
import {Observable}     from 'rxjs/Observable';
import {CoursesFrontApp}     from '../../courses-front';
@Injectable()
export class PanierService {
    constructor(private http: Http) { }


    private _panierUrl = `${CoursesFrontApp.API_ENDPOINT}panier`;
    private _panierArchiverUrl = `${CoursesFrontApp.API_ENDPOINT}panier/archiver`;
    private _panierProduitrUrl = `${CoursesFrontApp.API_ENDPOINT}panier/produit`;
    getCurrent() {
        return this.http.get(this._panierUrl)
            .map(res => <PanierProduit>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    getProduitSelect(idProduit: string) {
        var searchParams = new URLSearchParams();
        searchParams.set('idProduit', idProduit);
        return this.http.get(this._panierProduitrUrl, { search: searchParams })
            .map(res => {
                if (res.status == 200) {
                    return <ProduitSelect>res.json();
                }
                return null;
            })
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

