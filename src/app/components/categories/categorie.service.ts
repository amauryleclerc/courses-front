
import {Injectable}     from 'angular2/core';
import {Http, Response, URLSearchParams, RequestOptionsArgs} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Categorie}           from './categorie';
import {Observable}     from 'rxjs/Observable';
import {CoursesFrontApp}     from '../../courses-front';
@Injectable()
export class CategorieService {
    constructor(private http: Http) { }


    private _categorieUrl = `${CoursesFrontApp.API_ENDPOINT}categorie`;
    private _categoriesUrl = `${CoursesFrontApp.API_ENDPOINT}categories`;

    getCategories() {
        return this.http.get(this._categoriesUrl)
            .map(res => <Categorie[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    addCategorie(categorie:Categorie) {
        let headers = new Headers(); headers.append('Content-Type', 'application/json');
        return this.http.post(this._categorieUrl, JSON.stringify(categorie), {headers:headers})
          //  .map((res: Response) => res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

