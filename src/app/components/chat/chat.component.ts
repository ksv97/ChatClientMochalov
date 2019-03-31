import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string = '';
  messages: string [] = [ 'hello', 'kitty'];
  loggedInUsers: string[] = ['Rodion', 'Evgeny']

  constructor(public sharedService: SharedService) { }

  sendMessage() {
    let newMessage: string = '';
    let currentTime = new Date();
    let currentTimeStr = currentTime.toLocaleTimeString();
    newMessage += '[' + currentTimeStr + ']' + ' ' + this.sharedService.currentOnlineUser.username + ': ' + this.message;

    this.messages.push(newMessage);
    this.message = '';
  }

  ngOnInit() {
  }

}
