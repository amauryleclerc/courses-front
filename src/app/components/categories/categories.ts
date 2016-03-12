import {Component, OnInit} from 'angular2/core';
import {Categorie}           from './categorie';
import {CategorieService}           from './categorie.service';
import {NgForm}    from 'angular2/common';

@Component({
    selector: 'categories',
    templateUrl: 'app/components/categories/categories.html',
    styleUrls: ['app/components/categories/categories.css'],
    providers: [],
    directives: [],
    pipes: []
})
export class Categories {
    categories: Categorie[];
    categorie: Categorie;
    errorMessage: string;
    active: boolean;
    success:boolean;
    constructor(private _categorieService: CategorieService) {
    }
    ngOnInit() {
        this.active = false;
        this.success = false;
        this.categorie = new Categorie('', '');
        this.getCategories();
    }
    newCategorie() {
        this.active = true;
        this.categorie = new Categorie('', '');
    }
    onSubmit() {
        this.active = false;
        this._categorieService.addCategorie(this.categorie)
            .subscribe(
            res => { this.setSuccess(); this.getCategories() },
            error => this.errorMessage = <any>error);
    }
    getCategories() {
        this._categorieService.getCategories()
            .subscribe(
            categories => this.categories = categories,
            error => this.errorMessage = <any>error);
    }
    setSuccess(){
        this.success = true; 
         setTimeout(()=>   this.success = false, 2000);
    }
}
