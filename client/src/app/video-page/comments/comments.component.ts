import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html'
})
export class CommentsComponent implements OnInit {
    
    private comments = [
        {
            userId: '123',
            userName: 'Vasya',
            comment: 'Comment1 fdsfsdfsdf'
        },
        {
            userId: '123',
            userName: 'Vasya',
            comment: 'Comment1 fdsfsdfsdf'
        }
    ];
    private newComment = '';

    constructor(private authService: AuthService) { }

    ngOnInit() { }

    addComment(newComment) {
        let comment = {
            userId: this.authService.userData.userId,
            userName: this.authService.userData.userName,
            comment: newComment
        }
        this.comments.push(comment);
    }
}