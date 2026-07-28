import { Category } from "./category";

export interface Product {
  id: number;
  categoryId: number;
  sku: string;
  name: string;
  price: number;
  categoryName?: Category;
}

export interface CreateProductDto {
  sku: string;
  name: string;
  price: number;
  categoryId: number;
}

export class ProductParams {
    pageNumber = 1;
    pageSize = 10;
}