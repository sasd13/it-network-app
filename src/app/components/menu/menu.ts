import { Component, Input } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from 'services';

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[] = [];

    constructor(
         private channelService: ChannelService,
    ) {
    }

    async addChannel(data) {
        this.channels = await this.channelService.getAll();
    }
}