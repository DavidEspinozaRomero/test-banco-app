import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProductsService } from './products.services';

const mockProducts = [
  { id: '1', name: 'Producto 1', description: 'Descripción del producto 1', logo: 'logo.jpg', date_release: '2023-01-01', date_revision: '2024-01-01' },
  { id: '2', name: 'Producto 2', description: 'Descripción del producto 2', logo: 'logo.jpg', date_release: '2023-01-01', date_revision: '2024-01-01' },
  { id: '3', name: 'Producto 3', description: 'Descripción del producto 3', logo: 'logo.jpg', date_release: '2023-01-01', date_revision: '2024-01-01' },
];

const mockApiResponse = {
  message: 'Productos obtenidos',
  data: mockProducts
};
const mockApiResponseToCreate = {
  message: 'Productos obtenidos',
  data: mockProducts[0]
};

const expectedProducts = [
  { id: '1', name: 'Producto 1', description: 'Descripción del producto 1', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '2', name: 'Producto 2', description: 'Descripción del producto 2', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
  { id: '3', name: 'Producto 3', description: 'Descripción del producto 3', logo: 'logo.jpg', dateRelease: '2023-01-01', dateReview: '2024-01-01' },
];

describe('Products', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual(expectedProducts);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });
  it('should return product by id', () => {
    service.getProduct(expectedProducts[0].id).subscribe(product => {
      expect(product).toEqual(expectedProducts[0]);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  // it('should create a new product', () => { 
  //   service.createProduct(mockProducts[0]).subscribe(product => {
  //     expect(product).toEqual({...expectedProducts[0]});
  //   });

  //   const req = httpMock.expectOne('http://localhost:3002/bp/products');
  //   expect(req.request.method).toBe('POST');
  //   req.flush(mockApiResponseToCreate);
  // });

});
