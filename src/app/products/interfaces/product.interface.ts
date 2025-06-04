export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    dateRelease: string;
    dateReview: string;
}
export interface ProductApi {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export interface ProductApiResponse {
    message?: string;
    data: ProductApi[];
}