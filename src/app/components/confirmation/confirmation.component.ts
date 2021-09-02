import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  orderedItems: Product[] = []
  total = 0

  confirmedOrder: boolean = false

  firstName: string
  address: string
  cardNumber: string

  constructor(private productsService:ProductsService) {
    this.total = 0

    this.firstName = ""
    this.address = ""
    this.cardNumber = ""
   }

  ngOnInit(): void {
    this.confirmedOrder = false

    this.orderedItems = this.productsService.getCartedItems()
    
    for (let i = 0; i < this.orderedItems.length; i++) {
      this.total = this.total + this.orderedItems[i].price * this.orderedItems[i].inCartQty
    }
  }

  submitOrder() {
    this.confirmedOrder = true
    this.productsService.clearCart()
  }

}
