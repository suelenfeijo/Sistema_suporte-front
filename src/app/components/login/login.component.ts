import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  //primeiro pparametro é any , e o segundo nesse caso, é usado o validators para validar email
  email = new FormControl(null, Validators.email);
  //valida se o campo senha tem o min de 3 caracters
  senha = new FormControl(null, Validators.minLength(3));

  constructor( 
    private toast: ToastrService,
    private service: AuthService
    ) { }

  ngOnInit(): void {
  }

  logar(){ this.service.authenticate(this.creds).subscribe(resposta => 
    {  this.service.successfulLogin(resposta.headers.get('Authorization').substring(7)); console.log('Resposta: ', resposta); },
    ()=>{
        this.toast.error('Usuário e/ou senha inválidos!')
      })}

  validaCampos(): boolean{
 
      return this.email.valid && this.senha.valid;
  
  }

}
