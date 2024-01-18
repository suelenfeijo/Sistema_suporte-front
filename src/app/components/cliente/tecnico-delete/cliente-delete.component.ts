import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {


  cliente: Cliente = {
    id:     '',
    nome:   '',
    senha:  '',
    email:  '',
    cpf:    '',
    perfis: [],
    dataCriacao: ''
  }




  constructor(private service:ClienteService, private toast: ToastrService,
  private router: Router, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      /* pegando o parâmetro id que vem na url, com o ActivatedRoute é possível pegar os parametros da url*/
      this.cliente.id = this.route.snapshot.paramMap.get('id');
      this.findById();
     }
    


    findById():void{
      this.service.finById(this.cliente.id).subscribe(resposta=>{
        resposta.perfis =[];
        this.cliente = resposta;
      });
    }
    delete(){
      this.service.delete(this.cliente.id).subscribe(() => {
        this.toast.success('Técnico deletado com sucesso', 'Deletado');
        this.router.navigate(['../../'], {relativeTo: this.route});
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
  
   
  
  }

