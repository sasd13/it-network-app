import { Injectable } from '@angular/core';
import { Notification } from 'models';
import { LoggedUser } from './User';

@Injectable()
export class NotificationService {
    itemKey = "$activities";

    constructor(
        private user: LoggedUser, 
    ) { }

    getAll(): Notification[] {
        let serializedNotifications = localStorage.getItem(this.itemKey);
        if( serializedNotifications ) {
            return JSON.parse(serializedNotifications);
        }

        return null;
    }

    push(type: string) {
        let notifications = this.getAll();

        if (!notifications) {
            notifications = [];
        }

        let notification: Notification = new Notification();
        notification.type = type;
        notification.user = this.user;
        notification.creationTime = new Date().getTime();

        notifications.push(notification);
        localStorage.setItem(this.itemKey, JSON.stringify(notifications));
    }

    clean() {
        localStorage.removeItem(this.itemKey);
    }
}