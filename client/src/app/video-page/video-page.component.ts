import {CommentsComponent} from "./comments/comments.component";
import { AddMomentComponent } from './add-moment/add-moment.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoService } from './../shared/video.service';
import { AuthService } from './../shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
    selector: 'video-page',
    templateUrl: 'video-page.component.pug',
    styleUrls:['video-page.component.styl']
})
export class VideoPageComponent implements OnInit {
    public activity: string = "comments";
    private videoId: string;
    @ViewChild(VideoPlayerComponent) videoPlayer: VideoPlayerComponent;
    @ViewChild(AddMomentComponent) addMoment: AddMomentComponent;
    public lastComment= {
        userId: 'guest',
        userName: 'Гість',
        comment: ''
    };
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

    commentAdded(comment) {
        this.lastComment = comment;
    }

    momentSelected(moment) {
        this.videoPlayer.toMoment(moment);
    }

    videoChangedState(player) {
        if(player.getPlayerState() === 1) {
            this.addMoment.videoPaused = false;
        } else if (player.getPlayerState() === 2) {
            this.addMoment.pauseTime = player.getCurrentTime();
            this.addMoment.videoPaused = true;
        }

    }
}
