import { Component, Input } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from 'services';
import { AuthenticationService, NotificationService } from '../../services/index';

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[] = [];

    constructor(
         private channelService: ChannelService,
         private authService : AuthenticationService,
         private notifService : NotificationService
    ) {}

    async addChannel(data) {
        this.channels = await this.channelService.getAll();
    }
    
    logout(){
        this.authService.logout();
        this.notifService.clean();
    }
}