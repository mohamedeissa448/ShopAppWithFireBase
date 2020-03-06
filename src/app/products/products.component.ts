import { ProductService } from "./../product.service";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  currentCategory: string;
  constructor(productServ: ProductService, activeRoute: ActivatedRoute) {
    productServ.getAll().subscribe(actions => {
      this.products = actions;
      this.filteredProducts = actions;

      activeRoute.queryParams.subscribe(params => {
        this.currentCategory = params.category;
        this.filteredProducts = this.currentCategory
          ? this.products.filter(
              product => product.payload.val().category === params.category
            )
          : this.products;
      });
    });
  }
}
