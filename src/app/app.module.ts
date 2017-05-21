import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './message/message.component';
import { NotifyComponent } from './notify/notify.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageComponent,
    NotifyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
