import { VideoService } from './../../shared/video.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rate',
    templateUrl: 'rate.component.html',
    styleUrls: ['rate.component.styl']
})
export class RateComponent implements OnInit {
    
    @Input() private videoId: string;
    public rated = false;

    constructor(private videoService: VideoService) { }

    ngOnInit() { }

    addLike() {
        this.rated = true;
        this.videoService.addLike(this.videoId).subscribe(data => {
            console.log("Added like");
        });
    }

    addDislike() {
        this.rated = true;
        this.videoService.addDislike(this.videoId).subscribe(data => {
            console.log("Added dislike");
        });
    }
}