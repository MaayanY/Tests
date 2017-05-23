import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
	app;
	constructor(private activatedRoute: ActivatedRoute) { }
	ngOnInit() {
  		this.activatedRoute.params.subscribe((params: Params) => {
        	this.app = params['app'];
        
      	});	
  	}  
}
