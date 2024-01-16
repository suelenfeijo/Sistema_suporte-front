import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{

  //quando o path for vazio oque renderiza é NavComponent
  path:'',component: NavComponent, 
  //a home é filha do path vazio , ela herda oque é renderizado no path '' , e é renderizado dentro dele
  children: [{path: 'home', component: HomeComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
