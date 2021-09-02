import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product
  selectedQty: number = 0
  cartedItems: Product[] = []

  constructor(private productsService:ProductsService, private route:ActivatedRoute) { 
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
    this.route.paramMap.subscribe( params => {
      const id: number = parseInt((params.get("id") as unknown) as string)

      this.cartedItems = this.productsService.getCartedItems()
      const inCartedCheck = this.cartedItems.filter( item => item.id === id)
      
      if (inCartedCheck.length === 0 ) {
        this.productsService.getProducts().subscribe( res => {
          this.product = res[id-1]
          this.selectedQty = 0
        })
      } else {
        this.product = inCartedCheck[0]
        this.selectedQty = this.product.inCartQty
        }
    })
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
