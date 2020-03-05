import { ProductService } from "./../../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/models/product";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnDestroy {
  products: any[];
  subscription: Subscription;
  filteredProducts: any[];
  constructor(product: ProductService) {
    this.subscription = product.getAll().subscribe(actions => {
      this.filteredProducts = this.products = actions;
    });
  }
  filter(query) {
    this.filteredProducts = query
      ? this.products.filter(element =>
          element.payload
            .val()
            .title.toLowerCase()
            .includes(query.toLowerCase())
        )
      : this.products;
    console.log("this.filteredProducts", this.filteredProducts);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
