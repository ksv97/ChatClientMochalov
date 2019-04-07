import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChatComponent} from './components/chat/chat.component'
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MessagesComponent } from './components/messages/messages.component';
import { LinkifyPipe } from './linkify.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    MessagesComponent,
    LinkifyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
