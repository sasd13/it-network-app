import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'models';
import { PostService, MessageParser } from 'services';

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {
    @Input() post: Post;
    postDate : String;
    inputLabel: string;
    
    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.post.content = this.parser.parse(this.post);
        this.postDate = new Date(this.post.creationTime).toLocaleString();
        this.inputLabel = "Commenter";
    }

    toLike() {
        this.post.liked = ! this.post.liked;
        this.postService.like(this.post);
    }
}
