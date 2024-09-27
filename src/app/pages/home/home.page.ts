import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = ''; 
  

  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as { login: any };
      this.nombreUsuario = state.login.usuario;
    }
  } 

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
