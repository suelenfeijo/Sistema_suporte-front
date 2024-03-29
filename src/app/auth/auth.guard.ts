import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: ActivatedRoute,private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authenticated = this.authService.isAuthenticated();

    /*Se autenticado , retorne true, (libere as rotas) , caso não, navegue para
    login (que é a rota que está fora do canActive) e bloqueie enquanto
    não authenticado. (visualize o método isAuthenticated para saber mais. */ 

    if(authenticated) {
      return true;
    } else {
      this.router.navigate(['/login'], {relativeTo: this.route});

      return false
    }
  }
  
}