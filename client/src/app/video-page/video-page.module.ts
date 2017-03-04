import { YoutubePlayerModule } from 'ng2-youtube-player';
import { routes } from './video-player.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoPlayerComponent }   from './video-player/video-player.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        YoutubePlayerModule
    ],
    exports: [VideoPlayerComponent],
    declarations: [VideoPlayerComponent],
    providers: [],
})
export class VideoPageModule { }
