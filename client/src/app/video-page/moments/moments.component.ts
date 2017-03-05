import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { VideoService } from './../../shared/video.service';
import { VideoPlayerComponent } from './../video-player/video-player.component';
import { Input, EventEmitter } from '@angular/core';
import { Component, OnInit, ViewChild, Output } from '@angular/core';

@Component({
    selector: 'moments',
    templateUrl: 'moments.component.html',
    styleUrls: ['moments.component.styl']
})
export class MomentsComponent implements OnInit {
    
    @Output() public momentSelected = new EventEmitter();
    @Input() private videoId: string;
    public moments;
    
    constructor( private videoService: VideoService ) { }

    ngOnInit() {
        IntervalObservable.create(1000).map(() => {
            return this.videoService.getMoments(this.videoId);
        }).subscribe(moments$ => {
            moments$.subscribe( moments => {
                this.moments = moments;
            });
        });
     }

     onMomentSelect(moment) {
         this.momentSelected.next(moment);
     }
}