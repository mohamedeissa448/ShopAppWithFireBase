import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import * as firebase from "firebase";
import { map } from "rxjs/operators";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      map((user: firebase.User) => {
        if (user) return true;
        const returnUrl = state.url;
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: returnUrl }
        });
        return false;
      })
    );
  }
}
