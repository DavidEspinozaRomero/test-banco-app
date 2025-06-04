import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], productName: string, quantity: number = 5): Product[] {
    if (!value) return [];
    // if (!productName) return value;    
    
    return value.filter(product => product.name.toLowerCase().includes(productName.toLowerCase())).slice(0, quantity);
  }

}
