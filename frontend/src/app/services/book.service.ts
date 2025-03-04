import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';


@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiUrl = 'http://localhost:8000/api/books';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/view/${id}`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post<Book>(`${this.apiUrl}/add`, book);
  }

  updateBook(id: string, book: any): Observable<Book> {
    return this.http.patch<any>(`${this.apiUrl}/update/${id}`, book);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}