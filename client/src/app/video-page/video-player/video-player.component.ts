import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'video-player',
    templateUrl: 'video-player.component.pug',
    styleUrls: ['video-player.component.styl']
})
export class VideoPlayerComponent implements OnInit {
    player;
    @Input() public videoId: string;
    @Output() public videoChangedState = new EventEmitter();

    constructor(private route: ActivatedRoute){

    }

    ngOnInit() {
        
    }

    savePlayer (player) {
        this.player = player;
        player.seekTo(10, false);
        console.log('player instance', player)
    }
    
    onStateChange(event){
        console.log('player state', event.data);
        this.videoChangeState();
    }

    videoChangeState() {
        this.videoChangedState.next(this.player);
    }

    toMoment(moment) {
        this.player.stopVideo();
        this.player.seekTo(moment.time, false);
        this.player.playVideo();
    }



}
