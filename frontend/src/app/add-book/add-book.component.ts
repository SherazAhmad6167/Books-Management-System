import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  bookForm: FormGroup;
  selectedFile: any;
  book: Book | null = null;
  bookId: any

    categories = ['fiction', 'non-fiction', 'science', 'history', 'novel'];
    years = Array.from({length: 30}, (_, i) => (new Date()).getFullYear() - i);

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      year: ['', [Validators.required]],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe((res: any) => {
        let book = res.data
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          description: book.description,
          category: book.category,
          year: book.year,
          image: book.image
        });
        const imageUrl = book.image.replace(/\\/g, '/');
        this.bookForm.patchValue({ image: `http://localhost:8000/${imageUrl}` });
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bookForm.value.title);
      formData.append('author', this.bookForm.value.author);
      formData.append('description', this.bookForm.value.description);
      formData.append('category', this.bookForm.value.category);
      formData.append('year', this.bookForm.value.year);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile)
      }

      if (this.bookId) {
        this.bookService.updateBook(this.bookId, formData).subscribe(() => {
          this.router.navigate(['/books']);
        });
      } else {
        this.bookService.addBook(formData).subscribe(
          () => this.router.navigate(['/books']),
        );
      }
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file
      const reader = new FileReader();
      reader.onload = () => {
        this.bookForm.patchValue({ image: reader.result as string });
      }
      reader.readAsDataURL(file);

    }
  }
}