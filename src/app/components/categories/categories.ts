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
    edit: number;
    categories: Categorie[];
    categorie: Categorie;
    errorMessage: string;
    active: boolean;
    success: boolean;
    constructor(private _categorieService: CategorieService) {
    }
    ngOnInit() {
        this.edit = -1;
        this.active = false;
        this.success = false;
        this.categorie = new Categorie('', '',0);
        this.getCategories();
    }
    newCategorie() {
        this.active = true;
        this.categorie = new Categorie('', '',0);
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
            categories => this.categories = categories.sort((a:Categorie,b:Categorie)=> a.position - b.position),
            error => this.errorMessage = <any>error);
    }
    supprimer(categorie: Categorie) {
        this._categorieService.supprimer(categorie)
            .subscribe(
            categories => this.getCategories(),
            error => this.errorMessage = <any>error);
    }
    putCategorie(categorie: Categorie) {
        this.edit = -1;
        this._categorieService.updateCategorie(categorie)
            .subscribe(
            categories => this.getCategories(),
            error => this.errorMessage = <any>error);
    }
    setSuccess() {
        this.success = true;
        setTimeout(() => this.success = false, 2000);
    }
    up(categorie: Categorie){
            this._categorieService.up(categorie)
            .subscribe(
            categories => this.getCategories(),
            error => this.errorMessage = <any>error);
    }
    down(categorie: Categorie){
            this._categorieService.down(categorie)
            .subscribe(
            categories => this.getCategories(),
            error => this.errorMessage = <any>error);
    }
}
