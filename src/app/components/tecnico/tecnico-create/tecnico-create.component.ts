import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id:     '',
    nome:   '',
    senha:  '',
    email:  '',
    cpf:    '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
 /* DECLARAÇÃO DE ARRAY DE VALIDATORS:
  cpf: FormControl = new FormControl(null, [Validators.minLength(4),Validators.minLength(4)]);
 */
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private service: TecnicoService, private toast: ToastrService,
  private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }
  
  create(){
    this.service.create(this.tecnico).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['../'], {relativeTo: this.route});
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message); 
      }
    })
  }

  addPerfil(perfil: any):void{
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),1);
      console.log(this.tecnico.perfis);

    }else{
      this.tecnico.perfis.push(perfil);
      console.log(this.tecnico.perfis);


    }
  }

  validaCampos(): boolean{
    return this.nome.valid && this.email.valid && this.senha.valid && this.senha.valid
  

  }
}
