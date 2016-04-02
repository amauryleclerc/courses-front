
import {Injectable}     from 'angular2/core';
import {Http, Response, URLSearchParams, RequestOptionsArgs} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Categorie}           from './categorie';
import {Observable}     from 'rxjs/Observable';
import {CoursesFrontApp}     from '../../courses-front';
@Injectable()
export class CategorieService {
    constructor(private http: Http) { }



    private _categoriesUrl = `${CoursesFrontApp.API_ENDPOINT}categories`;

    getCategories() {
        return this.http.get(this._categoriesUrl)
            .map(res => {
                if (res.status == 200) {
                    return <Categorie[]>res.json();
                }
                return null;
            })
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    addCategorie(categorie: Categorie) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.post(this._categoriesUrl, JSON.stringify(categorie), { headers: headers })
            //  .map((res: Response) => res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    up(categorie: Categorie) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.post(this._categoriesUrl+"/up", JSON.stringify(categorie), { headers: headers })
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    down(categorie: Categorie) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.post(this._categoriesUrl+"/down", JSON.stringify(categorie), { headers: headers })
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    supprimer(categorie: Categorie) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.delete(this._categoriesUrl + "/" + categorie.id, { headers: headers })
            .do(data => console.log(data))
            .catch(this.handleError);
    }
     updateCategorie(categorie: Categorie) {
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._categoriesUrl, JSON.stringify(categorie), { headers: headers })
            .map(res => <Categorie>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

