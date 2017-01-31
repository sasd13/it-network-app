import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { PostSocketService, ChannelService } from 'services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];
    
    constructor(
        private channelService: ChannelService,
        private postSocket: PostSocketService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    async ngOnInit() {
        this.channels = await this.channelService.getAll();
        this.route.url
            .subscribe((url) => {
                if (url[0].path === "channel") {
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
        })
    }
}
