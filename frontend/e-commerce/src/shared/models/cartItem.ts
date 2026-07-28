export interface CartItem {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  total: number;
  items: CartItem[];
  createdAt: string;
}