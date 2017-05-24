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

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
  
})
export class MessageComponent implements OnInit {
	@Input() public socket: any;
  message;
  constructor() { }
  	
  sendMessage(){
	    this.socket.sendMessage(this.message);
	    this.message = '';
	}
  
  keyDownSend(event){
      if(event.keyCode == 13) {
        this.sendMessage();
    
      }
  }
  
  ngOnInit() {
  }

}
