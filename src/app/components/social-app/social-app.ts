import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel, User, Post, Like, Comment, Notification } from 'models';
import { ChannelService, NotificationService } from 'services';
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
        private notificationService: NotificationService
    ) {
    }

    async ngOnInit() { 
        this.channels = await this.channelService.getAll();
        this.refreshNotifications();
    }

    refreshNotifications() {
        this.notifications = this.notificationService.getAll();
    }
}
