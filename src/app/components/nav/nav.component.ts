import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  noOfCartedItems: number
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private productsService: ProductsService) {
    this.noOfCartedItems = 0;
  }
  // noinspection JSUnusedGlobalSymbols
  ngOnInit(): void {
    const cartedItems = this.productsService.getCartedItems()
    this.noOfCartedItems = cartedItems.length
  }

  // noinspection JSUnusedGlobalSymbols
  ngDoCheck() {
    const cartedItemsChange = this.productsService.getCartedItems()
    cartedItemsChange.length !== this.noOfCartedItems
      ? this.noOfCartedItems = cartedItemsChange.length
      : this.noOfCartedItems
  }
}
