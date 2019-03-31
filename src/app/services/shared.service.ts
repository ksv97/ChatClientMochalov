import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  currentOnlineUser: User = new User ();

  constructor() {
    this.currentOnlineUser.username = 'Rodion';
   }
}
