import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bibliografia',
  templateUrl: './bibliografia.page.html',
  styleUrls: ['./bibliografia.page.scss'],
})
export class BibliografiaPage implements OnInit {
  libros: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getBooks().subscribe((data) => {
      this.libros = data;
      console.log(this.libros); // Para asegurarte de que estás recibiendo los datos
    });
  }

}
