import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  standalone: false,
  
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  message = '';
  level = 'success';
  constructor(
    private bookService: BookService,
    private router: Router,
    private toastService: ToastrService
  ){ }


  ngOnInit(): void {
    this.findAllBooks();
  }


  private findAllBooks(){
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books; 
      }
    });
  }


  goToFirstPage(){
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage(){
    this.page--;
    this.findAllBooks();

  }


  goToPage(page: number){
    this.page = page;
    this.findAllBooks();

  }

  goToNextPage(){
    this.page++;
    this.findAllBooks();

  }


  goToLastPage(){
    this.page == this.bookResponse.totalPage as number - 1;
    this.findAllBooks();
  }


  get isLastPage(): boolean{
    return this.page == this.bookResponse.totalPage as number -1;
  }


  borrowBook(book: BookResponse){
    this.message = '';
    this.bookService.borrowBook({
      "book-id": book.id as number
    }).subscribe({
      next: () => {
        this.toastService.success('Book successfully added to your list', 'Yayyy!')
      },
      error: (err) => {
        this.toastService.error(err.error.error, 'Oops!')
      }
    });
  }
}