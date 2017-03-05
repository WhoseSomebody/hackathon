import { Http, RequestOptions, Headers } from '@angular/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
@Injectable()
export class VideoService {

    constructor(@Inject('apiName') private apiName: string, private http: Http){

    }

    getComments(videoId){
        return this.http.get(`${this.apiName}/api/video/${videoId}/comments`).map(data => {
            return JSON.parse(data['_body']);
        });
    }

    addComment(videoId, comment) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.apiName}/api/video/${videoId}/comments`, comment, options);
    }

    addLike(videoId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.apiName}/api/video/${videoId}/mark`, { like: true}, options);
    }

    addDislike(videoId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.apiName}/api/video/${videoId}/mark`, {}, options);
    }

    getVideoMarks(videoId) {
        return this.http.get(`${this.apiName}/api/video/${videoId}/mark`).map(data => {
            return JSON.parse(data['_body']);
        });
    }
}