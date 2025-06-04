import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from "./toast/component/toast/toast";
import { ToastService } from './toast/services/toast-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  toastService = inject(ToastService);

  constructor() {
    this.toastService.showDialog('Success', 'Bienvenido a la aplicación de banco', 'success');
  }
}
