import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";


export class LoginGuard implements CanActivate {

  constructor(private auth:AuthService, private route: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn()) {
      // this.route.navigate(['/admin/dashboard']);
        return true;

    }

    // this.route.navigate(['/login']);
    return true;
  }
}
