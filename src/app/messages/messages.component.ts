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
		
	public options : any = {
        title: 'Test Notification',
        body:  '',
        icon:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPC4pNnBqvW5k47OajgiDQ9-0e2oddhI9vR2B-NLYOvIzIA3HO',
        sound: '',
        data: {},
        tag: '',
        renotify: true,
        sticky: true,
        noscreen: true,
        silent: true,
        closeDelay: 0,
        onClick: this.notifyClick,
        onClose: this.notifyClose

    };
    event;
    connection;
  	constructor(private messgasService: MessageService, 
  				      private notifications: NotifyComponent) { }
    
    public notifyClick(event, notification){
      window.focus()

    }
  	
    public notifyClose(event, notification){
      window.focus()
      
    }

    ngOnInit() {
  		this.connection = this.messgasService.getMessages().subscribe(message => {
	        var m :any = message;
          this.messages.push(m);
	        this.options.body = m.text;
	        

	    })	
  	}

  	ngOnDestroy() {
    	this.connection.unsubscribe();
    }

}
