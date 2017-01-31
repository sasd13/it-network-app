import { Component, Input } from '@angular/core';
import { Comment } from 'models';
import { MessageParser } from 'services';

@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;
    commentDate : String;

    constructor(
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.comment.content = this.parser.parse(this.comment);
        this.commentDate = new Date(this.comment.creationTime).toLocaleString();
    }
    toLike() {
        this.comment.liked = ! this.comment.liked;
    }
}