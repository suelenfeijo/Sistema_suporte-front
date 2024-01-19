import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/Api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }


  logout(){
    this.router.navigate(['login'], {relativeTo: this.route});
    localStorage.clear();
  }
}