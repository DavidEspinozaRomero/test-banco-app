import { Product } from '@/products/interfaces/product.interface';
import { Component, effect, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'modal-notification',
  imports: [],
  templateUrl: './modal-notification.html',
  styleUrl: './modal-notification.scss'
})
export class ModalNotification {
  id = input.required<number>();
  product = input.required<Product>();
  onAccept = output<string>();
  alertDialog = viewChild<ElementRef<HTMLDialogElement>>('#alertDialog');
  showButton = viewChild<ElementRef<HTMLButtonElement>>('#showButton');

  showModal() {
    console.log('showDialog');
    this.alertDialog()?.nativeElement.showModal();
  }

  onSubmit() {
    this.onAccept.emit(this.product().id);
  }
}
