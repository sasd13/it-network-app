import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService } from 'services';
import { Post, PostContent } from 'models';

const LABEL_POSTER = "Poster";
const LABEL_COMMENTER = "Commenter";

@Component({
  selector: 'social-feed', 
  templateUrl: 'social-feed.html'
})
export class SocialFeedComponent implements OnInit {
    items: Post[] = [];
    channelId: string;
    postToComment: Post;
    postLabel: string;

    constructor(
        private postService: PostService, 
        private postSocket: PostSocketService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.postLabel = LABEL_POSTER;

        this.route.params
            .subscribe((params) => {
                this.channelId = params['id'];
                this.postService
                    .getAll(this.channelId)
                    .then((items) => {
                        this.items = items
                    });
            });
        // show messages received via WebSocket
        this.postSocket.onPost( (post: Post) => {
            this.postService.getAll(this.channelId)
                .then((items) => {
                    this.items = items;
            },(error)=>{
                console.log("ERROR: get posts via Web Socket");
            });
        })
    }

    refreshPosts(data) {
        this.route.params
            .subscribe((params) => {
               this.postService
                    .getAll(params['id'])
                    .then((items) => {
                        this.items = items;
                        this.inComment(null);
                    });
            })
    }

    inComment(data) {
        this.postLabel = data ? LABEL_COMMENTER : LABEL_POSTER;
        this.postToComment = data;
    }    
}
