import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MessageService }               from '../services/message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]

})
export class AppComponent implements OnInit{
	app;
	constructor(private activatedRoute: ActivatedRoute,
              private messgasService: MessageService) { }
	ngOnInit() {
  		
  }  
}
