import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService }       from '../../services/message.service';
import { NotificationsService } from 'angular2-notifications';
import {NotifyComponent} from '../notify/notify.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService, NotifyComponent]
})

export class MessagesComponent implements OnInit, OnDestroy {
	messages = [];
  	public options = {
        position: ["bottom", "right"],
        timeOut: 3000,
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true
    };
    public notification ={};

  	connection;
  	constructor(private messgasService: MessageService, 
  				private notifications: NotifyComponent) { }

  	ngOnInit() {
  		this.connection = this.messgasService.getMessages().subscribe(message => {
	        this.messages.push(message);
	        this.notifications.show();

	    })	
  	}

  	ngOnDestroy() {
    	this.connection.unsubscribe();
    }

}
