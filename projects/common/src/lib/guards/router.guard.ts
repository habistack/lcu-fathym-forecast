import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class RouterGuard implements CanActivate {

    constructor(protected route: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (route.params['route'].toUpperCase() === 'DEMO') {
                this.route.navigate(['/page-route'], 
                {
                    queryParams: { route: route.params['route']
                }
            });
            return true;
        }
        return false;
    }
}