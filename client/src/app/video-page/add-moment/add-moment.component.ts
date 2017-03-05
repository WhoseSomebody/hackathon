import { VideoService } from './../../shared/video.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'add-moment',
    templateUrl: 'add-moment.component.pug',
    styleUrls: ['add-moment.component.styl']
})
export class AddMomentComponent implements OnInit {
    
    @Input() public videoId: string;
    public videoPaused = false;
    public pauseTime;
    public momentName = '';
    constructor(private videoService: VideoService) { }

    ngOnInit() { }

    addMoment(momentTitle) {
        let moment = {
            title: momentTitle,
            time: this.pauseTime
        };
        this.momentName = "";
        this.videoService.addMoment(this.videoId, moment).subscribe( data => {
            console.log("Added moment");
        })
    }
}