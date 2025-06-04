import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  title = signal('');
  message = signal('');
  show = signal(false);
  type = signal<'success' | 'error'>('success');

  constructor() { }

  setTitle(title: string) {
    this.title.set(title);
  }

  setMessage(message: string) {
    this.message.set(message);
  }

  setType(type: 'success' | 'error') {
    this.type.set(type);
  }

  setData(title: string, message: string, type: 'success' | 'error' = 'success') {
    this.setTitle(title);
    this.setMessage(message);
    this.setType(type);
  }

  showDialog(title: string, message: string, type: 'success' | 'error' = 'success') {
    this.setData(title, message, type);
    this.show.set(true);
    
    const timer = setTimeout(() => {
      this.show.set(false);
      // clearTimeout(timer);
    }, 3000);
  }
}
