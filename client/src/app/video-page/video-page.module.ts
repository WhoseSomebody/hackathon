import { MomentsComponent } from './moments/moments.component';
import { RateComponent } from './rate/rate.component';
import { ChartsComponent } from './charts/charts.component';
import { CommentsComponent } from './comments/comments.component';
import { VideoPageComponent } from './video-page.component';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { routes } from './video-player.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoPlayerComponent }   from './video-player/video-player.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        YoutubePlayerModule,
        ChartsModule
    ],
    exports: [VideoPlayerComponent],
    declarations: [
        VideoPlayerComponent,
        VideoPageComponent,
        CommentsComponent,
        ChartsComponent,
        RateComponent,
        MomentsComponent
    ],
    providers: [],
})
export class VideoPageModule { }
