import { Injectable } from '@angular/core';
import { Notification } from 'models';

@Injectable()
export class NotificationService {
    itemKey = "$activities";

    constructor(

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
        notification.creationTime = new Date().getTime();

        notifications.unshift(notification);
        localStorage.setItem(this.itemKey, JSON.stringify(notifications));
    }

    clean() {
        localStorage.removeItem(this.itemKey);
    }
}