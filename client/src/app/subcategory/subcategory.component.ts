import { CategoriesService } from './../shared/categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'subcategory',
    templateUrl: 'subcategory.component.pug',
    styleUrls: ['subcategory.component.styl']
})
export class SubcategoryComponent implements OnInit {

    private subcategoryId;
    private categoryId;
    public videos;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.subcategoryId = params.subcategoryId;
            this.categoryId = params.categoryId;
            this.categoriesService.getVideos(this.categoryId, this.subcategoryId).subscribe(videos => {
                this.videos = videos;
            })
        });
    }

    onSelect(videoId) {
        this.router.navigate(['video', videoId]);
    }
}
