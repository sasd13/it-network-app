import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PostService, MessageParser } from '../../services/index';
import { Post } from '../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'user-inputs',
    templateUrl: 'user-inputs.html'
})
export class UserInputsComponent {
    @Input() inputLabel: string;
    @Input() channelId: string;
    message:string;
    @Output() sendPost = new EventEmitter<any>();
    @Input() postToComment: Post;

    constructor(
        private postService: PostService
    ) {}

    send() {
        if (this.postToComment) {
            this.postService.comment(this.postToComment, this.message).
                then( succes => {
                    this.sendPost.emit();
                },
                error => {
                    // TODO
                });
        } else {
            this.postService.post(this.channelId, this.message).
                then( succes => {
                    this.sendPost.emit();
                },
                error => {
                    // TODO
                });
        }
    }
}
