
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'video-player',
    templateUrl: 'video-player.component.html',
    styleUrls: ['video-player.component.styl']
})
export class VideoPlayerComponent implements OnInit {
    player;
    private id: string;
    
    constructor(private route: ActivatedRoute){

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });
    }

    savePlayer (player) {
        this.player = player;
        player.seekTo(10, false);
        console.log('player instance', player)
    }
    
    onStateChange(event){
        console.log('player state', event.data);
    }


}