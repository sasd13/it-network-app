import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'models';

const MESSAGE_NEW_CHANNEL = "New channel !";
const MESSAGE_NEW_USER = "New user connected";
const MESSAGE_NEW_POST = "New post !";
const MESSAGE_NEW_LIKE = "New like !";
const MESSAGE_NEW_COMMENT = "New comment !";

@Component({
    selector: 'notification',
    templateUrl: 'notification.html'
})
export class NotificationComponent implements OnInit {
    @Input() notification: Notification;
    notificationDate: String;
    notificationMessage: String;

    constructor() {}

    ngOnInit() {
        this.notificationDate = new Date(this.notification.creationTime).toLocaleString();
        this.notificationMessage = this.formatMessage();
    }

    formatMessage(): string {
        switch (this.notification.type) {
            case 'channel':
                return MESSAGE_NEW_CHANNEL;
            case 'user':
                return MESSAGE_NEW_USER;
            case 'post':
                return MESSAGE_NEW_POST;
            case 'like':
                return MESSAGE_NEW_LIKE;
            case 'comment':
                return MESSAGE_NEW_COMMENT;
            default:
                return null;
        }
    }
}
