import { AppUser } from "./../../models/userModel";
import { UserService } from "./../user.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthAdminGuardService implements CanActivate {
  constructor(private auth: AuthService, private userServ: UserService) {}
  canActivate(): boolean {
    //needs handling
    this.auth.user$
      .pipe(
        map(fireBaseUser => {
          console.log("aaaaaaaaaaaaaaaaa", fireBaseUser);
          return this.userServ.get(fireBaseUser.uid);
        })
      )
      .subscribe(AppUserObserv => {});
    return true;
    /* return this.auth.user$.pipe(switchMap((user : firebase.User) =>
       this.userServ.get(user.uid)
    )).pipe(map((appUser :AppUser)=>{
    return appUser.isAdmin
  }))*/
  }
}
