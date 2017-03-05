import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class CategoriesService {

    currentSubCategory = '';
    constructor(@Inject('apiName') private apiName: string, private http: Http){
    }

    getCategories(mainCategoryId){
        return this.http.get(`${this.apiName}/api/categories/${mainCategoryId}`).map(data => {
            return JSON.parse(data['_body']);
        });
    }

    getVideos(categoryId, subcategoryId){
        return this.http.get(`${this.apiName}/api/categories/${categoryId}/${subcategoryId}`).map(data => {
            return JSON.parse(data['_body']);
        });
    }
}