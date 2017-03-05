import { Router } from '@angular/router';
import { VideoService } from './../../shared/video.service';
import { CategoriesService } from './../../shared/categories.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'related-videos',
    templateUrl: 'related-videos.component.pug',
    styleUrls: ['related-videos.component.styl']
})
export class RelatedVideosComponent implements OnInit {
    @Input() public videoId: string;

    public subcategoryId;

    public relatedVideos;
    
    constructor(private categoriesService: CategoriesService, private videoService: VideoService, private router: Router) { }

    ngOnInit() { 
        this.subcategoryId = this.categoriesService.currentSubCategory;
        this.videoService.getRelatedVideos(this.videoId, this.subcategoryId).subscribe( videos => {
            this.relatedVideos = videos;
        });
    }

    onSelect(id){
        this.router.navigate(['video', id]);
    }
}