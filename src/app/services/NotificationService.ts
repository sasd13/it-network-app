import { Injectable } from '@angular/core';
import { Notification } from 'models';
import { LoggedUser } from './User';

@Injectable()
export class NotificationService {
    itemKey = "$activities";

    constructor(
        private user: LoggedUser, 
    ) {
    }

    getAll(): Notification[] {
        let serializedActivities = localStorage.getItem(this.itemKey);
        if( serializedActivities ) {
            return JSON.parse(serializedActivities);
        }

        return null;
    }

    push(link: any, type: string) {
        let activities = this.getAll();

        if (!activities) {
            activities = [];
        }

        let notification: Notification = new Notification();
        notification.type = type;
        notification.user = this.user;
        notification.creationTime = new Date().getTime();
        notification.linked = link;

        activities.push(notification);
        localStorage.setItem(this.itemKey, JSON.stringify(activities));
    }

    clean() {
        localStorage.removeItem(this.itemKey);
    }
}