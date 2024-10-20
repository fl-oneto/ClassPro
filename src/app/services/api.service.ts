import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://raw.githubusercontent.com/fl-oneto/bibliografia/refs/heads/main/libros.json';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  // Método para filtrar libros por categoría y/o palabra clave
  getFilteredBooks(category?: string, keyword?: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((libros: any[]) => {
        console.log('Libros originales:', libros); // Log de los libros originales
        return libros.filter(libro => {
          const hasTitle = libro.title && typeof libro.title === 'string';
          const hasAuthor = libro.author && typeof libro.author === 'string';
  
          const matchesCategory = category ? libro.category === category : true;
          const matchesKeyword = keyword ? 
            hasTitle && (libro.title.toLowerCase().includes(keyword.toLowerCase()) || 
            (hasAuthor && libro.author.toLowerCase().includes(keyword.toLowerCase()))) : true;
  
          console.log(`Filtrando libro: ${JSON.stringify(libro)}, Matches Category: ${matchesCategory}, Matches Keyword: ${matchesKeyword}`);
  
          return matchesCategory && matchesKeyword;
        });
      })
    );
  }
  

}
