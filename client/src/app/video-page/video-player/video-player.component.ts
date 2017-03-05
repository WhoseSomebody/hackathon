
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'video-player',
    templateUrl: 'video-player.component.pug',
    styleUrls: ['video-player.component.styl']
})
export class VideoPlayerComponent implements OnInit {
    player;
    @Input() public videoId: string;

    constructor(private route: ActivatedRoute){

    }

    ngOnInit() {

    }

    savePlayer (player) {
        this.player = player;
        player.stopVideo();
        console.log('player instance', player)
    }

    onStateChange(event){
        console.log('player state', event.data);
    }


}
