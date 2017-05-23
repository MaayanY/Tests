import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'message-item',
  templateUrl: './messaege-item.component.html',
  styleUrls: ['./messaege-item.component.css']
})

export class MessaegeItemComponent implements OnInit {
	@Input() public itemText: string;
  	@Input() public isSelected: boolean;
  	constructor() { }
  	getClass(text){
	  	return this.isSelected;
	  	
	}


  	ngOnInit() {
  	}

}
