import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  message = '';

  constructor() {}

  add(messagge: string) {
    this.message = messagge;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.message = '';
  }
}
