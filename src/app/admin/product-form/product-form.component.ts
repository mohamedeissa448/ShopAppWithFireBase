import { ProductService } from "./../../product.service";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "src/models/product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent {
  categories;
  id;
  product: Product = {
    category: "",
    imageUrl: "",
    price: NaN,
    title: ""
  };
  constructor(
    private productServ: ProductService,
    private router: Router,
    categoryServ: CategoryService,
    Activatedrouter: ActivatedRoute
  ) {
    categoryServ.getAll().subscribe(actions => {
      this.categories = actions;
      console.log(this.categories);
    });

    this.id = Activatedrouter.snapshot.paramMap.get("id");
    if (this.id) {
      this.productServ.getProduct(this.id).subscribe(actions => {
        this.product = <Product>actions.payload.val();
        console.log("this.product ", this.product, "this.id", this.id);
      });
    }
  }
  save(product) {
    if (!this.id) {
      //create a new object in DB
      this.productServ.create(product);
      this.router.navigateByUrl("/admin/products");
      return;
    }
    //update an existing object in DB
    this.productServ.update(this.id, product);
    this.router.navigateByUrl("/admin/products");
  }
  delete() {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }
    this.productServ.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }
}
