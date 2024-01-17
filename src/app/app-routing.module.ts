import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DecorationComponent } from './components/decoration/decoration.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';

const routes: Routes = [
  //quando o path for login oque renderiza é LoginComponent
  {path:'login', component:LoginComponent},
  {path:'',component: DecorationComponent },
  //quando o path for vazio oque renderiza é NavComponent
  {path:'inicio',component: NavComponent, canActivate: [AuthGuard] ,   
  //a home é filha do path vazio , ela herda oque é renderizado no path '' , e é renderizado dentro dele
  children:   [{path: 'home', component: HomeComponent},



  //tecnicos -> filho de NavComponent, funciona igual home
  {path: 'tecnicos', component: TecnicoListComponent},
  {path: 'tecnicos/create', component: TecnicoCreateComponent}

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
