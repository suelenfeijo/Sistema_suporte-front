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
        /*error.errors é a lista de erros que é retornada do servidor
        , e é usado um for , a variavel element percorre cada item e 
        tras um toast de erro exibindo o log */
        if(ex.error.errors){
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        }else{
          /*sendo apenas um erro, o servidor retorna error e o toast
          exibe o erro */ 
          this.toast.error(ex.error.message); 
        }
      })
    }
  
   
  
  }

