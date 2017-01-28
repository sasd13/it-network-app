import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap';
import { ChannelService } from 'services';

@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(ModalDirective) 
    modal:ModalDirective;
    @ViewChild(NgForm) 
    ngForm:NgForm;

    // event emitted to parent
    @Output() add = new EventEmitter<any>();
    model =  {name: ''};
    
    constructor(
        private channelService: ChannelService,
        private router : Router,
    ) {
    }

    save() {
        if (this.ngForm.valid) {
            this.modal.hide();
            this.channelService.add(this.model.name).
                then(success => {
                    this.add.emit(this.model);
                },
                    error =>{
                    // TODO treat addChannel error
                });
        }
    }
}