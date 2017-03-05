import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { VideoService } from './../../shared/video.service';
import { Component, OnInit, Input } from '@angular/core';
declare var Chart: any;
@Component({
    selector: 'charts',
    templateUrl: 'charts.component.html',
    styleUrls: ['charts.component.styl']
})
export class ChartsComponent implements OnInit {
    
    @Input() private videoId: string;

    public likes = {
        labels: [ 'Лайки/Дизлайки'],
        options: {
            responsive: false,
            animation: {
                duration: 0,
                onComplete: function () {
                    // render the value of the chart above the bar
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = this.chart.config.options.defaultFontColor;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                            ctx.fillText(dataset.data[i], model.x, model.y - 5);
                        }
                    });
                }
            }
        }
    };

    public audience = {
        labels: ['Чоловіки', 'Жінки', 'Гості'],
        options: {
            responsive: false,
            animation: {
                duration: 500,
                easing: "easeOutQuart",
                onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset) {

                    for (var i = 0; i < dataset.data.length; i++) {
                    var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                        total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                        mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
                        start_angle = model.startAngle,
                        end_angle = model.endAngle,
                        mid_angle = start_angle + (end_angle - start_angle)/2;

                    var x = mid_radius * Math.cos(mid_angle);
                    var y = mid_radius * Math.sin(mid_angle);

                    ctx.fillStyle = '#fff';
                    if (i == 3){ // Darker text color for lighter background
                        ctx.fillStyle = '#444';
                    }
                    var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
                    ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                    // Display percent in another line, line break doesn't work for fillText
                    ctx.fillText(percent, model.x + x, model.y + y + 15);
                    }
                });               
                }
            }
        }
    };

    constructor(private videoService: VideoService) { }

    ngOnInit() {
        IntervalObservable.create(1000).map(() => {
            return this.videoService.getVideoMarks(this.videoId);
        }).subscribe(marks$ => {
            marks$.subscribe( marks => {
                this.likes['data'] = [
                {
                    data: [marks.likes],
                    label: 'Лайки'
                },
                {
                    data: [marks.dislikes],
                    label: 'Дизлайки'
                }
            ];
            });
        });
        // this.videoService.getVideoMarks(this.videoId).subscribe( marks => {
        //     console.log(marks);
        //     this.likes['data'] = [
        //         {
        //             data: [marks.likes],
        //             label: 'Лайки'
        //         },
        //         {
        //             data: [marks.dislikes],
        //             label: 'Дизлайки'
        //         }
        //     ];
        // });
        IntervalObservable.create(1000).map(() => {
            return this.videoService.getAudience(this.videoId);
        }).subscribe(audience$ => {
            audience$.subscribe( audience => {
                this.audience['data'] = [
                    audience.male,
                    audience.female,
                    audience.guest
                ];
            });
        });
        // this.videoService.getAudience(this.videoId).subscribe( audience => {
        //     this.audience['data'] = [
        //         audience.male,
        //         audience.female,
        //         audience.guest
        //     ];
        // });
     }
}