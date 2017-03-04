import { Component, OnInit } from '@angular/core';
declare var Chart: any;
@Component({
    selector: 'charts',
    templateUrl: 'charts.component.html',
    styleUrls: ['charts.component.styl']
})
export class ChartsComponent implements OnInit {
    
    public userViews = {
        data: [{
            data: [10, 15, 30, 20, 40, 20, 10, 90, 100, 90],
            label: 'Перегляди за останній час'
        }],
        times: [ 'now', '-5', '-10', '-15', '-20', '-25', '-30', '-35', '-40', '-45'].reverse(),
        colors: [
            { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ],
        options: {
            responsive: false
        }
    };

    public audience = {
        labels: ['Чоловіки', 'Жінки', 'Гості'],
        data: [100, 50, 30],
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

    constructor() { }

    ngOnInit() { }
}