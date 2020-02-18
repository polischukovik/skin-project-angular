import { Product } from '../products/entity/product';

export class Order {
  uuid: string;
  submitedDate: Date;
  customerName: string;
  phone: string;
  city: string;
  outlet: string;
  products: Product[];
  status: string;
}
