import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService } from 'services';
import { Post, PostContent, Comment } from 'models';

@Component({
  selector: 'social-feed', 
  templateUrl: 'social-feed.html'
})
export class SocialFeedComponent implements OnInit {
    items: Post[] = [];
    channelId: string;
    inputLabel: string;

    constructor(
        private postService: PostService, 
        private postSocket: PostSocketService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.inputLabel = "Poster";

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
        // show comments received via WebSocket
        this.postSocket.onComment( (comment: Comment) => {
            this.postService.getAll(this.channelId)
                .then((items) => {
                    this.items = items;
            },(error)=>{
                console.log("ERROR: get comments via Web Socket");
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
                    });
            })
    }  
}
