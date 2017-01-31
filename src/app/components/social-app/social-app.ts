import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel, User, Post, Like, Comment, Notification } from 'models';
import { ChannelService, PostSocketService, NotificationService } from 'services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];
    notifications: Notification[] = [];
    
    constructor(
        private channelService: ChannelService,
        private route: ActivatedRoute,
        private postSocketService: PostSocketService,
        private notificationService: NotificationService
    ) {
    }

    async ngOnInit() { 
        this.channels = await this.channelService.getAll();

        this.postSocketService.onNewChannel( (channel: Channel) => {
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
            this.pushNotification('post');
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
