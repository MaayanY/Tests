import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output
} from '@angular/core';

declare var Notification;

@Component({
  selector: 'notification',
  template: ''
})

export class NotifyComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public title: string;
  @Input() public body: string;
  @Input() public icon: string;
  @Input() public sound: string;
  @Input() public data: any;
  @Input() public tag: string;
  @Input() public renotify: boolean = false;
  @Input() public sticky: boolean = false;
  @Input() public vibrate: Array<number>;
  @Input() public noscreen: boolean = false;
  @Input() public silent: boolean = true;
  @Input() public closeDelay: number = 0;

  @Output('load') public onLoad: EventEmitter<any> = new EventEmitter();
  @Output('show') public onShow: EventEmitter<any> = new EventEmitter();
  @Output('close') public onClose: EventEmitter<any> = new EventEmitter();
  @Output('error') public onError: EventEmitter<any> = new EventEmitter();
  @Output('action') public onClick: EventEmitter<any> = new EventEmitter();

  public checkCompatibility () {
    return !!('Notification' in window);
  }

  public isPermissionGranted (permission) {
    return permission === 'granted';
  }

  public requestPermission () {
    return Notification.requestPermission();
  }

  public show () {
    if (!this.checkCompatibility()) {
        return console.log('Notification API not available in this browser.');
    }

    return this.requestPermission()
      .then((permission) => this.isPermissionGranted(permission))
      .then(() => this.create());
  }

  public create () {
    let notification = new Notification(this.title, {
      data: this.data,
      tag: this.tag,
      body: this.body,
      icon: this.icon,
      silent: this.silent,
      sound: this.sound,
      renotify: this.renotify,
      sticky: this.sticky,
      vibrate: this.vibrate,
      noscreen: this.noscreen
    });

    this.attachEventHandlers(notification);
    this.close(notification);

    return notification;
  }

  public close (notification): void {
    if (this.closeDelay) {
      setTimeout(() => {
        notification.close();
      }, this.closeDelay);
    } else {
      notification.close();
    }
  }

  public closeAll (): void {
    Notification.close();
  }

  attachEventHandlers (notification): void {
    notification.onshow = () => {
      this.onShow.emit({ notification });
    };

    notification.onclick = (event) => {
      this.onClick.emit({ event, notification });
    };

    notification.onerror = () => {
      this.onError.emit({ notification });
    };

    notification.onclose = () => {
      this.onClose.emit({ notification });
    };
  }

  public ngOnInit (): void {
    this.onLoad.emit({});
  }

  public ngOnDestroy (): void {
    this.closeAll();
  }

  public ngOnChanges(...args: any[]) {
    	if(this.title && this.title !='' && this.body && this.body !=''){
          (this.show());
      }
      
    
  }

}
