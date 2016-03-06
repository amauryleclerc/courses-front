
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {PanierProduit}           from './panier';
import {Observable}     from 'rxjs/Observable';
@Injectable()
export class PanierService {
  constructor (private http: Http) {}


  private _panierUrl = 'http://localhost:8090/api/panier';  

  getCurrent () {
    return this.http.get(this._panierUrl)
                    .map(res => <PanierProduit> res.json())
                    .do(data => console.log(data)) 
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}

