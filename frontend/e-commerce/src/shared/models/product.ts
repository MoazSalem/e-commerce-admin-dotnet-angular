import { Category } from "./category";

export interface Product {
  id: number;
  categoryId: number;
  sku: string;
  name: string;
  price: number;
  category?: Category;
}

export interface CreateProductDto {
  sku: string;
  name: string;
  price: number;
  categoryId: number;
}