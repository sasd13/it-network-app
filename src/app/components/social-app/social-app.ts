import { Component, OnInit } from '@angular/core';
import { Channel, User, Post, Like, Comment, Notification } from 'models';
import { ChannelService, PostSocketService, NotificationService } from 'services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];
    notifications: Notification[] = [];
    
    constructor(
        private channelService: ChannelService,
        private postSocketService: PostSocketService,
        private notificationService: NotificationService,
        private postSocket: PostSocketService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    async ngOnInit() {
        this.channels = await this.channelService.getAll();
        this.route.params
            .subscribe((params) => {
                if (!params['id']) {
                    this.router.navigate(['/channel/'+this.channels[0].id]);
                }
            });

        // show messages received via WebSocket listener
        this.postSocket.onNewChannel( (channel: Channel) => {
            this.channelService.getAll()
                .then((channels) => {
                    this.channels = channels;
            },(error)=>{
                console.log("ERROR: get channels via Web Socket");
            });
            this.pushNotification('channel');
            this.refreshNotifications();
        });
        
        this.postSocketService.onUserConnect( (user: User) => {
            this.pushNotification('user');
            this.refreshNotifications();
        });

        this.postSocketService.onPost( (post: Post) => {
            this.pushNotification('post');
            this.refreshNotifications();
        });

        this.postSocketService.onLike( (like: Like) => {
            this.pushNotification('like');
            this.refreshNotifications();
        });

        this.postSocketService.onComment( (comment: Comment) => {
            this.pushNotification('comment');
            this.refreshNotifications();
        });

        this.refreshNotifications();
    }

    pushNotification(type: string) {
        this.notificationService.push(type);
    }

    refreshNotifications() {
        this.notifications = this.notificationService.getAll();
    }
}
