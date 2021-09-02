import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  
  @Input() cartedItem: Product
  @Output() deleteItem: EventEmitter<Product> = new EventEmitter()
  @Output() changeInCart: EventEmitter<number> = new EventEmitter()

  inCartQty: number = 0
  
  constructor(private productsService: ProductsService) { 
    this.cartedItem = {
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
  }

  decrement(product: Product) {
    this.inCartQty = product.inCartQty
    
    this.inCartQty > 0 && (this.inCartQty -=1)
    this.inCartQty === 0 && this.deleteItem.emit(product) // quantity reduced to 0 equals being deleted from cart
  
    this.productsService.updateCartedItem(product.id,this.inCartQty)
    this.changeInCart.emit(this.inCartQty) //to update the total in cart component
  }
  
  increment(product: Product) {
    this.inCartQty = product.inCartQty
    this.inCartQty +=1
    this.productsService.updateCartedItem(product.id,this.inCartQty)
    this.changeInCart.emit(this.inCartQty)
  }

  deleteFromCart(toBeDeletedItem: Product): void {
    this.deleteItem.emit(toBeDeletedItem)
  }

}
