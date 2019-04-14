import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string = '';
  messages: Message[] = [];
  loggedInUsers: User[] = []

  constructor(public sharedService: SharedService, private http: HttpService, private router: Router, private messageService: MessageService) { }

  signOut() {
    this.http.signout(this.sharedService.currentOnlineUser)
    .subscribe(user => {
      if (user != null) {
        this.sharedService.currentOnlineUser = new User ();
        this.router.navigate(['/login']);
      }
      else this.messageService.log('Unable to logout. User doesnt exist!', true);
    });    
  }

  clearChatHistory() {
    this.http.cleanChatHistory().subscribe(
      numberOfDeletedMessages => {
        if (numberOfDeletedMessages >= 0) {
          this.messages = [];
          this.messageService.log('Successfully deleted chat history!', false);
        }
        else {
          this.messageService.log('An error occured when trying to delete chat history', true);
        }
        
      }
    )
  }

  sendMessage() {
    let newMessage = new Message();
    newMessage.username = this.sharedService.currentOnlineUser.username;
    newMessage.message = this.message;

    this.http.say(newMessage).subscribe(
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
