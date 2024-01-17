import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Tecnico } from "src/app/models/tecnico";

@Component({
  selector: "app-tecnico-list",
  templateUrl: "./tecnico-list.component.html",
  styleUrls: ["./tecnico-list.component.css"],
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] =[{
    id: 1,
    nome:'Suelen',
    cpf: '123.456.789-10',
    email:'suelenmelo@mail.com',
    senha:'123',
    perfis:['0'],
    dataCriacao: '17/01/2024'
  }];

/*colunas mostradas dentro do array, esses mesmos nomes precisam estar no html , em matColumnDef
para ser linkada com as colunas aqui declaradas do array*/
  displayedColumns: string[] = ["id", "nome", "cpf", "email","acoes"];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  constructor() {}

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
