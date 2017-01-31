import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSocketService, PostService, NotificationService } from 'services';
import { Post, PostContent, Comment } from 'models';

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
    @Output() activity = new EventEmitter<any>();

    constructor(
        private postService: PostService, 
        private postSocket: PostSocketService,
        private route: ActivatedRoute,
        private notificationService: NotificationService
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
                    this.inComment(null);
                    this.notificationService.push(post, 'post');
                    this.activity.emit();
            },(error)=>{
                console.log("ERROR: get posts via Web Socket");
            });
        })
        // show comments received via WebSocket
        this.postSocket.onComment( (comment: Comment) => {
            this.postService.getAll(this.channelId)
                .then((items) => {
                    this.items = items;
                    this.notificationService.push(comment, 'comment');
                    this.activity.emit();
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
                        this.inComment(null);
                    });
            })
    }

    inComment(data) {
        this.postLabel = data ? LABEL_COMMENTER : LABEL_POSTER;
        this.postToComment = data;
    }    
}
