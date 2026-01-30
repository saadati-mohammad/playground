export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    inStock: boolean;
}

export interface ProductState {
    products: Product[];
    selectedProductId: number | null;
    loading: boolean;
    error: string | null;
}

export const initialProductState: ProductState = {
    products: [],
    selectedProductId: null,
    loading: false,
    error: null
}