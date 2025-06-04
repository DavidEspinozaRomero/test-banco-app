import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";

import { routes } from "./app.routes";
import { Location } from "@angular/common";

describe('AppRoutes', () => {
    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter(routes)],
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    it('should navigate to "products" redirect to "/products"', async () => {
        await router.navigate(['products']);
        expect(location.path()).toBe('/products');
    });

    it('should navigate to "unknow-page" redirect to "/products"', async () => {
        await router.navigate(['unknow-page']);
        console.log(location.path());

        expect(location.path()).toBe('/products');
    });

    it("should load the proper component", async () => {
        const productsRoute = routes.find(route => route.path === 'products')!;
        expect(productsRoute).toBeDefined();

        const productsComponent = await productsRoute.loadComponent!() as any;
        expect(productsComponent).toBeDefined();
        expect(productsComponent.default.name).toBe('ProductsList2');

        const productRoute = routes.find(route => route.path === 'product')!;
        expect(productRoute).toBeDefined();

        const productComponent = await productRoute.loadComponent!() as any;
        expect(productComponent).toBeDefined();
        expect(productComponent.default.name).toBe('ProductForm2');

        const productIdRoute = routes.find(route => route.path === 'product/:id')!;
        expect(productIdRoute).toBeDefined();

        const productIdComponent = await productIdRoute.loadComponent!() as any;
        console.log(productIdComponent.default.name);
        expect(productIdComponent).toBeDefined();
        expect(productIdComponent.default.name).toBe('ProductForm2');
    });
});
