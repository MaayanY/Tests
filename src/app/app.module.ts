import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './message/message.component';
import { NotifyComponent } from './notify/notify.component';
import { MessaegeItemComponent } from './messaege-item/messaege-item.component';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'notification', component: AppComponent },
  
];
@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageComponent,
    NotifyComponent,
    MessaegeItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    [RouterModule.forRoot(appRoutes)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
