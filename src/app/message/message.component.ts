import { Component, OnInit } from '@angular/core';
import { MessageService }       from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessageService]
})
export class MessageComponent implements OnInit {
	message;
  	constructor(private messgasService:MessageService) { }
  	
  	sendMessage(){
	    this.messgasService.sendMessage(this.message);
	    this.message = '';
	}

  	ngOnInit() {
  	}

}
