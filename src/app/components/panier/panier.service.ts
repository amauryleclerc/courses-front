import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class PanierService {
  constructor (private http: Http) {}

  private _heroesUrl = 'app/heroes'; 

  
}