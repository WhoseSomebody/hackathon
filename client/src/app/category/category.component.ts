import { CategoriesService } from './../shared/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'category',
    templateUrl: 'category.component.html',
    styleUrls: ['category.component.styl']
})
export class CategoryComponent implements OnInit {
    
    private categoryId;
    public categories;

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoriesService,
        private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.categoryId = params.id;
            this.categoryService.getCategories(this.categoryId).subscribe( data => {
                this.categories = data;
            })
        });
     }
     
     onSelect(subcategoryId){
        this.router.navigate(['category', this.categoryId, subcategoryId]);
     }
}