import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private activRoute: ActivatedRoute
  ) {
    this.user$ = this.afAuth.authState;
  }
  logIn() {
    localStorage.setItem(
      "returnUrl",
      this.activRoute.snapshot.queryParamMap.get("returnUrl") || "/"
    );
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logOut() {
    this.afAuth.auth.signOut();
  }
}
