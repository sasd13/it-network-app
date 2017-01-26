import { Component, Input } from '@angular/core';
import { Channel } from 'models';

@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[] = [];
}