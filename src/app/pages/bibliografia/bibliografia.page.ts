import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bibliografia',
  templateUrl: './bibliografia.page.html',
  styleUrls: ['./bibliografia.page.scss'],
})
export class BibliografiaPage implements OnInit {
  libros: any[] = [];
  filteredLibros: any[] = [];
  selectedCategory: string = '';
  keyword: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getBooks().subscribe((data) => {
      this.libros = data;
      this.filteredLibros = data; // Inicialmente mostrar todos los libros
    });
  }
  applyFilters() {
    const category = this.selectedCategory; // Asegúrate de que esto contenga la categoría seleccionada
    const keyword = this.keyword; // Asegúrate de que esto contenga la palabra clave ingresada
  
    this.apiService.getFilteredBooks(category, keyword).subscribe((filteredBooks) => {
      console.log('Libros filtrados:', filteredBooks); // Verifica lo que retorna
      this.libros = filteredBooks; // Asigna los libros filtrados
    });
  }
  

}
