import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string = '';
  isError: boolean = false;
 
  log(message: string, isError: boolean) {
    this.message = message;
    this.isError = isError;
    setTimeout(() => this.message = '', 3000);
  }

  clear() {
    this.message = '';
  }

}
