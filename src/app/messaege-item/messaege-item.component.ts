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

export class MessaegeItemComponent implements OnInit, OnChanges {
  	@Input() public itemText: string;
  	@Input() public isSelected: boolean;
  	constructor() { }
    getClass(text){
  	  	return this.isSelected;
  	  	
  	}

    public ngOnChanges(...args: any[]) {
      var x=args;
      
    
    }
  	ngOnInit() {
  	}

}
