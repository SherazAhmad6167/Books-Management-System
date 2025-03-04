import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBookId!: string

  constructor(
    private bookService: BookService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe(
      (books:any) => {
        console.log("Data from Api", books);
        this.books = books.data
      })
  }

  openDeleteModal(id: string, content: any){
    this.selectedBookId = id
      this.modalService.open(content)
  }


  deleteBook(id: string ){
    if(id){
      this.bookService.deleteBook(id).subscribe(
         () => this.loadBooks(),);
      }
  }
}