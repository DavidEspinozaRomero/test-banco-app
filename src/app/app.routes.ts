import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'products', loadComponent: () => import('@/products/pages/products-list/products-list')},
    {path: 'product', loadComponent: () => import('@/products/pages/product-form/product-form')},
    {path: 'product/:id', loadComponent: () => import('@/products/pages/product-form/product-form')},
    {path: '**', redirectTo: 'products', pathMatch: 'full'}
];
