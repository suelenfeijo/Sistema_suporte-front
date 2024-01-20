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

  /*Serviço que possibilita usar serviços do jwt*/ 
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    /*http -> quem possibilita realizar transações http*/ 
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    /*tentativa de autenticação enviando os dados de login e senha , 
    recebendo como parametro email e senha do usuário interceptado pela classe
    de intermediação credenciais (email e senha)*/ 
  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  /*sendo bem sucedido o login, armazena o token no localStorage que 
  obteve na resposta do header Authorization da response de authenticate, 
  o Authorization contém o valor do token gerado e encriptografado pelo servidor*/ 
  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }


  /*Se o token obtido do localStorage não é nulo 
  e também é negativo de isTokenExpired (não está expirado) , retorna o token, se não false */ 
  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }


  /*Limpa o token do localStorage e bloqueia o canActiveGuard*/ 
  logout(){
    this.router.navigate(['login'], {relativeTo: this.route});
    localStorage.clear();
  }
}