
import {Injectable}     from 'angular2/core';
import {Http, Response, URLSearchParams, RequestOptionsArgs} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Produit}           from './produit';
import {Observable}     from 'rxjs/Observable';
@Injectable()
export class ProduitService {
    constructor(private http: Http) { }


    private _produitsUrl = 'http://localhost:8090/api/produits';

    getProduits() {
        return this.http.get(this._produitsUrl)
            .map(res => <Produit[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    updateProduit(produit: Produit) {
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._produitsUrl, JSON.stringify(produit), { headers: headers })
            .map(res => <Produit>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    searchProduits(search: string) {
        var searchParams = new URLSearchParams();
        searchParams.set('search', search);
        return this.http.get(this._produitsUrl + "/search", { search: searchParams })
            .map(res => <Produit[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

