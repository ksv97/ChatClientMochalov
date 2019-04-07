import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from '../../services/http.service'
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  user: User = new User();

  constructor(private router: Router, private httpService: HttpService, private messageService: MessageService) {

  }

  login () {
    // let loginResult = this.http.login(this.userLogin);
    
      this.httpService.login(this.user).subscribe (user => {
          this.router.navigate(['/chat']);  
      });   
    
  }

  signup() {
    this.httpService.signup(this.user).subscribe (user => {
      if (user != null) {
        this.messageService.log("Registration succeeded!", false); 
      }
      else {
        this.messageService.log(`Registration failed for user ${user.username}`, true);
      }
    });   
    
  }

}
