// noinspection JSUnusedGlobalSymbols

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartedItems: Product[] = []
  total: number
  inCartChange: number

  constructor(private productsService:ProductsService, private router: Router) {
    this.total = 0
    this.inCartChange = 0
  }

  ngOnInit(): void {
    this.cartedItems = this.productsService.getCartedItems()
    for (let i = 0; i < this.cartedItems.length; i++) {
      this.total = this.total + this.cartedItems[i].price * this.cartedItems[i].inCartQty
    }
  }

  deleteItem(toBeDeletedItem: Product): void {
    this.cartedItems = this.cartedItems.filter(item => item.id !== toBeDeletedItem.id)
    this.productsService.deleteCartedItem(toBeDeletedItem)

    for (let i = 0; i < this.cartedItems.length; i++) {
      this.total = 0
      this.total = this.total + this.cartedItems[i].price * this.cartedItems[i].inCartQty
    }
  }

  changeInCart(prodQty:number): void {
    if (this.inCartChange !== prodQty) {
      this.inCartChange = prodQty
      this.total = 0
      for (let i = 0; i < this.cartedItems.length; i++) {
        this.total = this.total + this.cartedItems[i].price * this.cartedItems[i].inCartQty
      }
    }
  }

  ngDoCheck(): void {
    if (this.cartedItems.length === 0) {
        this.total = 0
    }
  }

  checkout() {
    this.router.navigate(['/confirmation'])
  }

}
