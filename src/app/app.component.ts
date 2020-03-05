import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(route: Router, auth: AuthService, userSer: UserService) {
    auth.user$.subscribe(user => {
      console.log("test", user);
      if (user) {
        userSer.save(user);
        const retunUrl = localStorage.getItem("returnUrl");
        if (retunUrl) {
          route.navigateByUrl(retunUrl);
          localStorage.removeItem("returnUrl");
        }
      }
    });
  }
}
