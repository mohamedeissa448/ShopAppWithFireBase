import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { first, take } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}
  private create() {
    return this.db.list("/shopping-carts").push({
      createdAt: new Date().getTime()
    });
  }
  private getCart(cartId: string) {
    return this.db.object("/shopping-carts" + cartId);
  }
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    console.log("cartId", cartId);
    if (cartId) return cartId;

    let result = await this.create();
    console.log("result ", result);
    localStorage.setItem("cartId", result.key);
    return result.key;
  }
  private getItem(product, cartId) {
    return this.db.object(
      "/shopping-carts/" + cartId + "/items/" + product.key
    );
  }
  async addToCart(product) {
    let cartId = await this.getOrCreateCartId();
    //add product to user's cart in firebase
    this.getItem(product, cartId)
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(myProduct => {
        console.log("qqqqq", myProduct.payload.val());
        if (myProduct.payload.exists()) {
          this.db
            .object("/shopping-carts/" + cartId + "/items/" + product.key)
            .update({
              quantity: myProduct.payload.val()["quantity"] + 1
            });
        } else
          this.db
            .object("/shopping-carts/" + cartId + "/items/" + product.key)
            .update({
              quantity: 1,
              product: product.payload.val()
            });
      });
  }
}
