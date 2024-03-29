import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
    private route: ActivatedRoute) { }

  //quando esse componente é iniciado , tudo dentro desse método inicia junto
  ngOnInit(): void {
    //quando esse componente for iniciado, navegue para o path home
    this.router.navigate(['/chamados'], {relativeTo: this.route});
  }

  logout(){
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', {timeOut: 5000})
  }

}
