import { pipe } from 'rxjs';
import { ProductFilterPipe } from './product-filter-pipe';

const mockProducts = [
  { id: '1', name: 'Producto 1', description: 'Descripción del producto 1', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '2', name: 'Producto 2', description: 'Descripción del producto 2', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '3', name: 'Producto 3', description: 'Descripción del producto 3', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '4', name: 'Producto 4', description: 'Descripción del producto 4', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '5', name: 'Producto 5', description: 'Descripción del producto 5', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '6', name: 'Producto 6', description: 'Descripción del producto 6', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '7', name: 'Producto 7', description: 'Descripción del producto 7', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '8', name: 'Producto 8', description: 'Descripción del producto 8', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '9', name: 'Producto 9', description: 'Descripción del producto 9', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '10', name: 'Producto 10', description: 'Descripción del producto 10', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '11', name: 'Producto 11', description: 'Descripción del producto 11', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
];

describe('ProductFilterPipe', () => {
  let pipe: ProductFilterPipe = new ProductFilterPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if no array is provided', () => {
    const result = pipe.transform([], '');
    expect(result).toEqual([]);
  });

  it('should return empty array if no array is provided', () => {
    const result = pipe.transform([], '');
    expect(result).toEqual([]);
  });

  it('should return the same array sliced by quantity if no name is provided', () => {
    const result = pipe.transform(mockProducts, '');
    expect(result).toEqual(mockProducts.slice(0, 5));
  });

  it('should return the same array sliced by quantity by name', () => {
    const result = pipe.transform(mockProducts, '1');
    const expectedResult = mockProducts.filter(product => product.name.toLowerCase().includes('1'.toLowerCase())).slice(0, 5);
    expect(result).toEqual(expectedResult);
  });

});
