export class Product {
  uuid: string;
  name: string;
  description: string;
  size: string;
  price: number;
  position: number;
  image: string;
  // tslint:disable-next-line: variable-name
  _links: {
    self: {
      href: string
    }
  };
}
