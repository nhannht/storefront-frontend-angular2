import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product

  selectedQty: number = 0
  cartedItems: Product[] = []

  constructor(private productsService:ProductsService) {
    this.product = {
        id: 1,
        name: "",
        price: 1,
        url: "",
        description: "",
        inStockQty: 1,
        inCartQty: 0
    }
  }

  ngOnInit(): void {
    this.cartedItems = this.productsService.getCartedItems()
    if (this.product.inCartQty > 0) {
      this.selectedQty = this.product.inCartQty
    } else if (this.product.inCartQty === 0 || this.product.inCartQty === undefined) {
      this.selectedQty = 0
    }
  }

  decrement() {
    return this.selectedQty > 0 ? this.selectedQty -=1 : this.selectedQty
  }

  increment() {
    return this.selectedQty +=1
  }

  addToCart(product: Product) {
    if (this.selectedQty === 0) {
      alert("Please select product quantity")
    } else {
      const inCartedCheck = this.cartedItems.filter ( item => item.id === product.id)
      if (inCartedCheck.length === 0 ) {
        this.productsService.addProductToCart(product,this.selectedQty)
        alert(`${product.name} has been added to your cart`)
      } else {
        this.productsService.updateCartedItem(product.id,this.selectedQty)
        alert(`Quantity of ${product.name} has been updated your cart`)
      }
    }
  }

}
