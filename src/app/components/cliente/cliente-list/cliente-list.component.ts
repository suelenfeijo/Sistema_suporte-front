import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-list",
  templateUrl: "./cliente-list.component.html",
  styleUrls: ["./cliente-list.component.css"],
})
export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] =[];

/*colunas mostradas dentro do array, esses mesmos nomes precisam estar no html , em matColumnDef
para ser linkada com as colunas aqui declaradas do array*/
  displayedColumns: string[] = ["id", "nome", "cpf", "email","acoes"];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:ClienteService) {}

  ngOnInit(): void {
    /*inicia o component já renderizando o método findAll
    ,assim, trazendo todos os dados do método */
    this.findAll();
  }




  findAll(){
    this.service.findAll().subscribe(resposta=>
      {
        this.ELEMENT_DATA = resposta
        this.dataSource = new MatTableDataSource<Cliente>(resposta);
        this.dataSource.paginator = this.paginator;

      })
  }


  /*função de aplicar filtro*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
