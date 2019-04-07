import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string = '';
  messages: string [] = [];
  loggedInUsers: User[] = []

  constructor(public sharedService: SharedService, private http: HttpService) { }

  sendMessage() {
    this.http.say(this.message).subscribe(
      createdMessage => {
        this.messages.push(createdMessage)
        this.message = '';
      }
    );

    /*
    let newMessage: string = '';
    let currentTime = new Date();
    let currentTimeStr = currentTime.toLocaleTimeString();
    newMessage += '[' + currentTimeStr + ']' + ' ' + this.sharedService.currentOnlineUser.username + ': ' + this.message;

    this.messages.push(newMessage);
    this.message = '';
    */
  }

  ngOnInit() {
    this.http.getChatHistory().subscribe(
      messages => this.messages = messages
    );

    this.http.getOnlineUsers().subscribe(
      users => this.loggedInUsers = users
    )

  }

}
