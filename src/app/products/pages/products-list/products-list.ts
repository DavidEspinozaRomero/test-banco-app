import { Component, effect, ElementRef, inject, signal, viewChild, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ProductsService } from '@/products/services/products.services';
import { ProductFilterPipe } from '@/products/pipes/product-filter-pipe';
import { Product } from '@/products/interfaces/product.interface';
import { ModalNotification } from "../../components/modal-notification/modal-notification";

@Component({
  selector: 'app-products-list',
  imports: [RouterLink, DatePipe, ProductFilterPipe],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss'
})
export default class ProductsList {

  productsService = inject(ProductsService)
  isLoading = signal(false)
  products = signal<Product[]>([])
  selectedProduct = signal<Product | null>(null)
  activeDropdown = signal<string | null>(null);

  alertDialog = viewChild<ElementRef<HTMLDialogElement>>('alertDialog');

  loadProducts = effect(() => {
    this.productsService.getProducts().subscribe(products => {
      this.products.set(products);
    });
  });

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.products.update(products => products.filter(product => product.id !== id));
      this.closeModal();
    });
  }

  showModal(product: Product) {
    this.selectedProduct.set(product);
    this.alertDialog()?.nativeElement.showModal();
  }

  closeModal() {
    this.alertDialog()?.nativeElement.close();
    this.selectedProduct.set(null);
  }

  confirmDelete() {
    if (this.selectedProduct()) {
      this.deleteProduct(this.selectedProduct()!.id);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.activeDropdown.set(null);
    }
  }

  toggleDropdown(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.activeDropdown.set(this.activeDropdown() === product.id ? null : product.id);
  }
}
