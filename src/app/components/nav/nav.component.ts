import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  //quando esse componente é iniciado , tudo dentro desse método inicia junto
  ngOnInit(): void {
    //quando esse componente for iniciado, navegue para o path home
    this.router.navigate(['tecnicos'])
  }

}
