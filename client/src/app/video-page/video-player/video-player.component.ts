
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'video-player',
    templateUrl: 'video-player.component.html',
    styleUrls: ['video-player.component.styl']
})
export class VideoPlayerComponent implements OnInit {
    private id: string;
    
    constructor(private route: ActivatedRoute) {

    }
    
    ngOnInit() {
        this.route.params.subscribe( (params: Params) => {
            this.id = params.id;
        });
    }


}