import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}
  create(product) {
    this.db.list("/products").push(product);
  }
  getAll() {
    return this.db.list("/products").snapshotChanges();
  }
  getProduct(productId) {
    return this.db.object("/products/" + productId).snapshotChanges();
  }
  update(productId, updatedProduct) {
    this.db.object("/products/" + productId).update(updatedProduct);
  }
  delete(productId) {
    this.db.object("/products/" + productId).remove();
  }
}
