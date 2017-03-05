import { VideoService } from './../shared/video.service';
import { AuthService } from './../shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'video-page',
    templateUrl: 'video-page.component.html'
})
export class VideoPageComponent implements OnInit {
    
    private videoId: string;
    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private videoService: VideoService
    ) { }

    ngOnInit() { 
        this.route.params.subscribe(params => {
            this.videoId = params.id;
            this.videoService.startWatchingVideo(this.videoId, this.authService.userData).subscribe(data => {
                console.log('Started watching video' + this.videoId);
            });
        });
    }
}