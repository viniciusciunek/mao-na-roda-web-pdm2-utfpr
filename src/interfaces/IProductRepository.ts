import { Product } from "../types/Product";

export interface IProductRepository {
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    createProduct(product: Product): Promise<Product>;
    updateProduct(id: string, product: Product): Promise<Product>;
    deleteProduct(id: string): Promise<boolean>;
}
