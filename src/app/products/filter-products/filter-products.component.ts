import { CategoryService } from "./../../category.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-filter-products",
  templateUrl: "./filter-products.component.html",
  styleUrls: ["./filter-products.component.css"]
})
export class FilterProductsComponent {
  categories: any[] = [];
  @Input("currentCategory") currentCategory;
  constructor(categoryServ: CategoryService) {
    categoryServ.getAll().subscribe(actions => {
      this.categories = actions;
    });
  }
}
