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
  // <HTMLDialogElement>
  alertDialog = viewChild<ElementRef<HTMLDialogElement>>('#alertDialog');
  showButton = viewChild<ElementRef<HTMLButtonElement>>('#showButton');

  loadDom = effect(() => {
    // const showButton = document.querySelector("#show-button")!;
    // showButton.addEventListener("click", function () {
    //   const alertDialog: HTMLDialogElement = document.querySelector("#alert-dialog")!;
    //   alertDialog.showModal();
    // });
  });

  showModal() {
    console.log('showDialog');
    this.alertDialog()?.nativeElement.showModal();
  }

  onSubmit() {
    this.onAccept.emit(this.product().id);
  }
}
