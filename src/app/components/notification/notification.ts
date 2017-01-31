import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'models';

const MESSAGE_CHANNEL = " has created a new channel";
const MESSAGE_USER = " is connected";
const MESSAGE_POST = " has posted";
const MESSAGE_LIKE = " has liked a post";
const MESSAGE_COMMENT = " has commented a post";

@Component({
    selector: 'notification',
    templateUrl: 'notification.html'
})
export class NotificationComponent implements OnInit {
    @Input() notification: Notification;
    notificationDate: String;
    notificationMessage: String;

    constructor() { }

    ngOnInit() {
        this.notificationDate = new Date(this.notification.creationTime).toLocaleString();
        this.notificationMessage = this.formatMessage();
    }

    formatMessage(): string {
        switch (this.notification.type) {
            case 'channel':
                return this.notification.user.username + MESSAGE_CHANNEL;
            case 'user':
                return this.notification.user.username + MESSAGE_USER;
            case 'post':
                return this.notification.user.username + MESSAGE_POST;
            case 'like':
                return this.notification.user.username + MESSAGE_LIKE;
            case 'comment':
                return this.notification.user.username + MESSAGE_COMMENT;
            default:
                return null;
        }
    }
}
