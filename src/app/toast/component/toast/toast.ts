import { Component, computed, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { ToastService } from '@/toast/services/toast-service';

@Component({
  selector: 'toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {

  toastService = inject(ToastService);
  title = computed(() => this.toastService.title());
  message = computed(() => this.toastService.message());
  show = computed(() => this.toastService.show());
  type = computed(() => this.toastService.type());
  toastDialog = viewChild<ElementRef<HTMLDialogElement>>('toastDialog');

  constructor() {
    effect(() => {
      if (this.show()) {
        this.toastDialog()?.nativeElement.show();
      } else {
        this.toastDialog()?.nativeElement.close();
      }
    });
  }

  close() {
    this.toastDialog()!.nativeElement.close();
    this.toastService.show.set(false);
  }

  toggle() {
    if (this.toastDialog()!.nativeElement.hasAttribute('open')) {
      this.close();
      return;
    }
    this.toastDialog()!.nativeElement.show();
  }

}
