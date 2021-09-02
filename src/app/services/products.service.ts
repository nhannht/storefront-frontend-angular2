import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartedItems: Product[] = []

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json')
  }

  addProductToCart(product: Product, selectedQty: number) {
    product["inCartQty"] = selectedQty
    this.cartedItems.push(product)
  }

  getCartedItems(): Product[] {
    return this.cartedItems
  }

  updateCartedItem(productId: number,inCartQty: number) {
    
    for (let item of this.cartedItems) {
      if (item.id === productId) {
        item.inCartQty = inCartQty
      }
    }
  }

  deleteCartedItem(toBeDeletedItem: Product) {
    this.cartedItems = this.cartedItems.filter( item => item.id !== toBeDeletedItem.id)
  }

  clearCart() {
    this.cartedItems = []
  }

}
