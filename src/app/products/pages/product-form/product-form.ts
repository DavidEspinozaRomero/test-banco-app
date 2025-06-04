import { Product } from '@/products/interfaces/product.interface';
import { ProductsService } from '@/products/services/products.services';
import { ToastService } from '@/toast/services/toast-service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export default class ProductForm {

  fb = inject(FormBuilder);
  productService = inject(ProductsService);
  toastService = inject(ToastService);
  id = input.required<string>();

  isDisabled = true
  isLoading = signal(false);

  today = new Date();
  nextYear = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate());
  minDate = this.today.toJSON().split('T')[0];

  productForm = this.fb.nonNullable.group({
    id: ['',
      {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        asyncValidators: [this.productIdValidator.bind(this)],
      }],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    dateRelease: [new Date().toJSON().split('T')[0], [Validators.required, this.dateValidator]],
    dateReview: [this.nextYear.toJSON().split('T')[0], [Validators.required]],
  });

  get idProduct() {
    return this.productForm.get('id');
  }

  get dateRelease() {
    return this.productForm.get('dateRelease')!;
  }
  get dateReview() {
    return this.productForm.get('dateReview')!;
  }

  constructor() {
    // actualizar la fecha de reestructuración
    this.dateRelease.valueChanges.pipe(
      tap(date => {
        if (typeof date === 'string') {
          const [ano, mes, dia] = (date as string).split('-');
          this.dateReview.reset(new Date(`${+ano + 1}-${+mes}-${dia}`).toJSON().split('T')[0]);
        }
      })
    ).subscribe()

    // efecto para cargar el producto
    effect(() => {
      if (this.id()) {
        this.idProduct?.disable();
        this.isLoading.set(true);
        this.productService.getProduct(this.id()).subscribe({
          next: (product) => {
            this.productForm.reset(product);
            this.isLoading.set(false);
          },
          error: () => {
            this.isLoading.set(false);
          }
        });
      }
    });
  }

  isValid(form: FormGroup, controlName: string) {
    const formControl = form.get(controlName)!;
    return formControl.errors && formControl.touched;
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const minDate = new Date().toJSON().split('T')[0];
    if (isNaN(selectedDate.getTime())) {
      return { invalidDate: true };
    }
    if (selectedDate.toJSON().split('T')[0] < minDate) {
      return { invalidDate: true };
    }
    return null;
  }

  productIdValidator(control: FormControl): Observable<ValidationErrors | null> {
    return this.productService.productIdValidator(control.value);
  }

  getErrorMessage(form: FormGroup, controlName: string) {
    const formControl = form.get(controlName)!;
    if (formControl.valid) return;
    const [key, { requiredLength }] = Object.entries(formControl.errors!)[0];

    const msg = {
      required: 'Campo requerido',
      minlength: `Ingrese al menos ${requiredLength} caracteres`,
      maxlength: `Ingrese no mas de ${requiredLength} caracteres`,
      min: 'La fecha debe ser de hoy en adelante',
      invalidDate: 'La fecha ingresada no es válida, debe ser de hoy en adelante',
      invalidId: 'El ID ingresado no es válido o ya existe',
    }[key];
    return msg
  }
  onSubmit() {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) {
      return;
    }
    const { id,
      name,
      description,
      logo,
      dateRelease,
      dateReview } = structuredClone(this.productForm.value);
    const product = {
      id,
      name,
      description,
      logo,
      date_release: dateRelease,
      date_revision: dateReview,
    }

    if (this.id()) {
      this.productService.updateProduct(this.id(), product).subscribe((_) => {
        this.productForm.reset()
        this.toastService.showDialog('Success', 'Producto actualizado', 'success');
      });
      return;
    }

    this.productService.createProduct(product).subscribe((_) => {
      this.productForm.reset()
      this.toastService.showDialog('Success', 'Producto creado', 'success');
    });
  }
}
