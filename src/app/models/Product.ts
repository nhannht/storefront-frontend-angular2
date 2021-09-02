export class Product {
      id: number;
      name: string;
      price: number;
      url: string;
      description: string;
      inStockQty: number;
      inCartQty: number

    constructor() {
        this.id = 1;
        this.name = "";
        this.price = 1;
        this.url = "";
        this.description = "";
        this.inStockQty = 1;
        this.inCartQty = 0
    }

}