import { CategoryService } from "./../category.service";
import { ProductService } from "./../product.service";
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  products: any[];
  filteredCtegories: any[];
  categories: any[];
  constructor(
    productServ: ProductService,
    categoryServ: CategoryService,
    activeRoute: ActivatedRoute
  ) {
    productServ.getAll().subscribe(actions => {
      this.products = actions;
      this.filteredCtegories = actions;
    });
    categoryServ.getAll().subscribe(actions => {
      this.categories = actions;
      console.log(" this.categories", this.categories);
    });
    activeRoute.queryParams.subscribe(params => {
      console.log("queryParams", params);
      this.filteredCtegories = this.products.filter(
        product => product.payload.val().category === params.category
      );
    });
  }
}
