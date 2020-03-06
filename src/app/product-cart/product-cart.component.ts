import { Component, Input } from "@angular/core";

@Component({
  selector: "app-product-cart",
  templateUrl: "./product-cart.component.html",
  styleUrls: ["./product-cart.component.css"]
})
export class ProductCartComponent {
  @Input("product") product;
  @Input("show-actions") showActions = true;
  constructor() {}
}
