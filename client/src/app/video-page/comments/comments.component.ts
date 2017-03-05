import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { VideoService } from './../../shared/video.service';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit, Input } from '@angular/core';
@Component({
    selector: 'comments',
    templateUrl: 'comments.component.pug',
    styleUrls:['comments.component.styl']
})
export class CommentsComponent implements OnInit {
    
    @Input() private videoId: string;

    private comments;
    private newComment = '';

    constructor(private authService: AuthService, private videoService: VideoService) { }

    ngOnInit() {
        IntervalObservable.create(1000).map(() => {
            return this.videoService.getComments(this.videoId);
        }).subscribe(comments$ => {
            comments$.subscribe( comments => {
                this.comments = comments;
            });
        });
     }

    addComment(newComment) {
        let comment = {
            userId: this.authService.userData.userId,
            userName: this.authService.userData.userName,
            comment: newComment
        }
        this.videoService.addComment(this.videoId, comment).subscribe(data => {
            console.log("Added");
        });
    }
}