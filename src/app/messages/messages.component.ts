import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output
} from '@angular/core';
import { MessageService }       from '../../services/message.service';
import { NotificationsService } from 'angular2-notifications';
import {NotifyComponent} from '../notify/notify.component';
import { MessaegeItemComponent }   from '../messaege-item/messaege-item.component';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService, NotifyComponent, MessaegeItemComponent]
})

export class MessagesComponent implements OnInit, OnDestroy {
	@Input() public app: string;
  action = this.notifyClick.bind(this);
  close = this.notifyClose.bind(this);
  messages = [];
  selectedMessage = '';
  
	options : any = {
        title: 'Goofy Notification',
        body:  '',
        icon:  'http://www.toonhood.com/admin/models/imagegalleryupload/1_(1)5.gif',
        sound: '',
        data: {},
        tag: 'Goofy',
        renotify: false,
        sticky: true,
        noscreen: true,
        silent: true,
        closeDelay: 0,
        onClick: this.action,
        onClose: this.close

    };
       
    connection;
  	constructor(private messgasService: MessageService, 
  				      private notifications: NotifyComponent,
                private activatedRoute: ActivatedRoute) { }
    
    notifyClick(event, notification){
      
      window.focus()
      
    }
  	
    notifyClose(event, notification){
      window.focus()
      
    }

    
    ngOnInit() {
  		this.connection = this.messgasService.getMessages().subscribe(message => {
	        var m :any = message;
          this.messages.map(function(message){
             message.isNew=false;
          });
          var data = {
            data: m,
            isNew: true
          }
          this.messages.push(data);
	        this.options.body = m.text;
	        

	    })
      
  	}

  	ngOnDestroy() {
    	this.connection.unsubscribe();
    }

}
