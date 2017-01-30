import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Post, Comment } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {
    @Input() post: Post;
    postDate : String;
    @Output() inComment = new EventEmitter<any>();
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.post.content = this.parser.parse(this.post);
        this.postDate = new Date(this.post.creationTime).toLocaleString();
    }

    comment() {
        this.inComment.emit(this.post);
    }
}
