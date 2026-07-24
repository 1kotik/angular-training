import {CartEntry} from "./cart-entry.model";

export interface Cart {
  id?: string;
  userId: string | number;
  products: CartEntry[];
}
