import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  NgZone
} from '@angular/core';

import {NotifyComponent} from '../notify/notify.component';
import {MessaegeItemComponent }   from '../messaege-item/messaege-item.component';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [NotifyComponent, MessaegeItemComponent]
})

export class MessagesComponent implements OnInit, OnDestroy {
	@Input() public socket: any;
  constructor(private activatedRoute: ActivatedRoute,private zone:NgZone ) { }
  action = this.notifyClick.bind(this);
  close = this.notifyClose.bind(this);
  messages = [];
  selectedMessage = '';
  
	options : any = {
        title: 'Mini Notification',
        body:  '',
        icon:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu3jlTYop6X9K6S8EJ3_tBS8UjkzxfMEKbF1FDZE44_1Uz7HuE',
        sound: '',
        data: {},
        tag: 'Mini',
        renotify: false,
        sticky: true,
        noscreen: true,
        silent: true,
        closeDelay: 0,
        onClick: this.action,
        onClose: this.close

    };
       
    connection;
  	
    signItem(event, notification){
      
      this.zone.run(() =>{
        this.messages.map(function(message){
             message.isNew=false;
             if(message.data.text==event.notification.body){
               message.isNew=true;
             }
        });
        
      });
      
      window.focus() 
      event.notification.close(event.notification); 
    }
    
    notifyClick(event, notification){
      this.signItem(event, notification);
    }
  	
    notifyClose(event, notification){
      this.signItem(event, notification);
      
    }

    
    ngOnInit() {
  		this.connection = this.socket.getMessages().subscribe(message => {
	        var m :any = message;
          this.messages.map(function(message){
             message.isNew=false;
          });
          var data = {
            data: m,
            isNew: true
          }
          this.messages.unshift(data);
	        this.options.body = m.text;
	        

	    })
      
  	}

  	ngOnDestroy() {
    	this.connection.unsubscribe();
    }

}
