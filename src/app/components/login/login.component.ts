import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  /*Interface que intermedia o email e senha na tentativa de login,
  no servidor: CredenciaisDTO. na classe JWTAuthenticationFilter do backend do projeto tem 
  mais informações sobre o funcionamento do fluxo e rotinas.*/ 
  creds: Credenciais = {
    email: '',
    senha: ''
  }

  //primeiro pparametro é any , e o segundo nesse caso, é usado o validators para validar email
  email = new FormControl(null, Validators.email);
  //valida se o campo senha tem o min de 3 caracters
  senha = new FormControl(null, Validators.minLength(3));

  constructor( 
    /*toast -> serviço de mensagens*/ 
    private toast: ToastrService,
    private service: AuthService,
    private router: Router,

    ) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
        this.router.navigate(['inicio']);
      
    },
    /*caso de erro, chama uma função anonima com o toast de erro*/ 
     () => {
      this.toast.error('Usuário e/ou senha inválidos');
    })
}

/* o email (formControl) retorna um true ou false*/
  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
